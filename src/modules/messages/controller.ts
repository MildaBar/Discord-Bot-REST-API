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

import { sendCongratulatoryMessage } from "../../../discordBot";
import { AttachmentBuilder } from "discord.js";

export default (db: Database) => {
  const router = Router();
  const messages = buildMsgRepository(db);

  router
    .route("/")
    .get(
      jsonRoute(async (req, res) => {
        try {
          const username = req.query.username as string;

          // if (!username) {
          //   return res
          //     .status(StatusCodes.NOT_FOUND)
          //     .json({ error: "User doesn't exists." });
          // }

          const userMsg = await getUsersMsg(username, db);

          if (userMsg) {
            return res.status(StatusCodes.OK).json({ messages: userMsg });
          } else {
            const allMessages = await messages.findAll();

            if (!allMessages) {
              return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Messages not found" });
            }

            return res.status(StatusCodes.OK).json(allMessages);
          }
        } catch (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
        }
      })
    )
    .post(async (req, res) => {
      try {
        const { username, sprintCode, channelId } = req.body;

        // GET SPRINT TITLE
        const sprint = await getSprintTitle(sprintCode, db);
        if (!sprint) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "Sprint title not found." });
        }
        const sprintTitle = sprint?.sprintTitle;

        // GET RANDOM MESSAGE
        const randomMessage = await getRandomMsg(db);
        if (!randomMessage) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "Random congratulatory message not found." });
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
