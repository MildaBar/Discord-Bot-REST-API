import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildMsgRepository from "./repository";
import { Database } from "@/database";
import { jsonRoute } from "@/utils/middleware";
import getUsersMsg from "./utils/getUsersMsg";
import getRandomMsg from "./utils/getRandomMsg";
import getSprintTitle from "./utils/getSprintTitle";
import getRandomGif from "./utils/getRandomGif";
import getGifId from "../congratulatoryMessages/utils/getGifId";
import getMsgId from "../congratulatoryMessages/utils/getMsgId";
import getSprintsId from "../congratulatoryMessages/utils/getSprintsId";
import getUsersId from "../congratulatoryMessages/utils/getUsersId";
import insertCongratulatoryMessage from "../congratulatoryMessages/controller";
import { sendCongratulatoryMessage } from "../../../discordBot/discordBot";
import getSprintMsg from "./utils/getSprintMsg";

export default (db: Database) => {
  const router = Router();
  const messages = buildMsgRepository(db);

  router
    .route("/")
    .get(
      jsonRoute(async (req, res) => {
        try {
          const username = req.query.username as string;
          const sprintId = req.query.sprint as string;

          if (!username && !sprintId) {
            // return all messages
            const allMessages = await messages.findAll();

            if (!allMessages) {
              return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Messages not found" });
            }

            return res.status(StatusCodes.OK).json(allMessages);
          } else if (username) {
            // fetch messages for a specific user
            const userMsg = await getUsersMsg(username, db);

            if (userMsg) {
              return res.status(StatusCodes.OK).json({ messages: userMsg });
            } else {
              return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Sprint messages not found." });
            }
          } else if (sprintId) {
            // fetch messages for a specific sprint
            const sprintMsg = await getSprintMsg(sprintId, db);

            if (sprintMsg) {
              return res.status(StatusCodes.OK).json({ message: sprintMsg });
            }
          }
        } catch (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
        }
      })
    )
    .post(async (req, res) => {
      try {
        const { username, sprintCode, channelId, messageTemplateId } = req.body;

        // GET SPRINT TITLE
        const sprint = await getSprintTitle(sprintCode, db);
        if (!sprint) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "Sprint title not found." });
        }
        const sprintTitle = sprint?.sprintTitle;

        // GET RANDOM MESSAGE
        let randomMessage = await getRandomMsg(db);
        if (!randomMessage) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "Random congratulatory message not found." });
        }

        // GET MESSAGE IF messageTemplateId AVAILABLE
        if (messageTemplateId) {
          const template = await messages.findById(messageTemplateId);

          if (!template) {
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ error: "Message template not found." });
          }
          randomMessage = template.template;
        }

        // GET GIF
        const gif = await getRandomGif();
        if (!gif) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "GIF not found." });
        }

        const congratulatoryMessage = `@${username} has just completed ${sprintTitle}! ${randomMessage}`;

        // SEND CONGRATULATORY MESSAGE
        const sendMsg = await sendCongratulatoryMessage(
          channelId,
          congratulatoryMessage
        );

        if (sendMsg) {
          // GET IDs
          const gifIdPromise = getGifId(db, gif);
          const msgIdPromise = getMsgId(db, randomMessage);
          const sprintIdPromise = getSprintsId(db, sprintCode);
          const userIdPromise = getUsersId(db, username);

          const [gifId, msgId, sprintId, userId] = await Promise.all([
            gifIdPromise,
            msgIdPromise,
            sprintIdPromise,
            userIdPromise,
          ]);

          const currentDate = new Date();
          const timestamp = currentDate.toISOString();
          // INSERT MSG DATA INTO DATABASE
          const insertMsgData = await insertCongratulatoryMessage(
            gifId!,
            msgId!,
            sprintId!,
            timestamp,
            userId!,
            db
          );

          if (!insertMsgData) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              error:
                "Failed to store congratulatory messages data into the database.",
            });
          }

          res.status(200).json({ congratulatoryMessage });
        } else {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to send congratulatory message." });
        }
      } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

  return router;
};
