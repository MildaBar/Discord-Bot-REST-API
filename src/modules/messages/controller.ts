import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildMsgRepository from "./repository";
import buildUsersRepository from "../users/repository";
import buildUsersMsgRepository from "../congratulatoryMessages/repository";
import { Database } from "@/database";
import { jsonRoute } from "@/utils/middleware";
import getRandomMsg from "./utils/getRandomMsg";
import getSprintTitle from "./utils/getSprintTitle";
import getRandomGif from "./utils/getRandomGif";
import getGifId from "../congratulatoryMessages/utils/getGifId";
import getMsgId from "../congratulatoryMessages/utils/getMsgId";
import getSprintsId from "../congratulatoryMessages/utils/getSprintsId";
import getUsersId from "../congratulatoryMessages/utils/getUsersId";
import insertCongratulatoryMessage from "../congratulatoryMessages/controller";

import { sendCongratulatoryMessage } from "../../../discordBot";

export default (db: Database) => {
  const router = Router();
  const messages = buildMsgRepository(db);

  router
    .route("/")
    .get(
      jsonRoute(async (req, res) => {
        try {
          const username = req.query.username as string;
          const users = buildUsersRepository(db, username);
          const usersMsg = buildUsersMsgRepository(db);
          if (username) {
            const userData = await users.findUser(username);
            const userId = userData?.id;

            const userMsgData = await usersMsg.finduserId(userId || 0);

            if (!userMsgData) {
              return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "No messages found for the specified user." });
            }

            const userMsgId = userMsgData.map((msg) => msg.messageTemplateId);

            const userMsgPromises = userMsgId.map((id) =>
              messages.findById(id)
            );

            const userMsg = (await Promise.all(userMsgPromises))
              .filter((message) => message !== undefined)
              .map((message) => message!.template);

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

        const congratulatoryMessage = `@${username} has just completed ${sprintTitle}! ${randomMessage} ${gif}`;

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

  // router.get("/messages", async (req, res) => {
  //   try {
  //     const username = req.query.username as string;
  //     const users = buildUsersRepository(db, username);

  //     if (!username) {
  //       return res
  //         .status(StatusCodes.BAD_REQUEST)
  //         .json({ error: "Username is required." });
  //     }

  //     const userMsg = await users.findUser(username);

  //     if (!userMsg) {
  //       return res
  //         .status(StatusCodes.NOT_FOUND)
  //         .json({ error: "No messages found for the specified user." });
  //     }
  //     return res.status(StatusCodes.OK).json({ messages: userMsg });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return res
  //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //       .json({ error: "Internal server error." });
  //   }
  // });

  return router;
};
