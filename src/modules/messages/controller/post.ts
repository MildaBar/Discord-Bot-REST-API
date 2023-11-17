import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { Database } from "@/database";
import { jsonRoute } from "@/utils/middleware";
import { sendCongratulatoryMessage } from "../../../../discordBot/discordBot";
import buildMsgRepository from "../repository";

// import services
import getRandomMsg from "../services/getRandomMsg";
import getSprintTitle from "../services/getSprintTitle";
import getRandomGif from "../services/getRandomGif";

// import congratulatoryMessages
import getGifId from "../../congratulatoryMessages/services/getGifId";
import getMsgId from "../../congratulatoryMessages/services/getMsgId";
import getSprintsId from "../../congratulatoryMessages/services/getSprintsId";
import getUsersId from "../../congratulatoryMessages/services/getUsersId";
import insertCongratulatoryMessage from "../../congratulatoryMessages/controller";

export default (db: Database) => {
  const router = Router();
  const messages = buildMsgRepository(db);

  router.route("/").post(
    jsonRoute(async (req, res) => {
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
    })
  );
  return router;
};
