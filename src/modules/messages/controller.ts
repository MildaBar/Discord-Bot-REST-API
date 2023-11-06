import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "./repository";
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
  const messages = buildRepository(db);

  router
    .route("/")
    .get(
      jsonRoute(async (req, res) => {
        try {
          const allMessages = await messages.findAll();

          if (!allMessages) {
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ error: "Messages not found" });
          }

          return res.status(StatusCodes.OK).json(allMessages);
        } catch (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
        }
      })
    )
    .post(async (req, res) => {
      try {
        const { username, sprintCode, channelId } = req.body;

        const sprint = await getSprintTitle(sprintCode, db);
        const sprintTitle = sprint?.sprintTitle;
        const randomMessage = await getRandomMsg(db);
        const gif = await getRandomGif();

        const congratulatoryMessage = `@${username} has just completed ${sprintTitle}! ${randomMessage} ${gif}`;

        sendCongratulatoryMessage(channelId, congratulatoryMessage);

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
        await insertCongratulatoryMessage(
          gifId!,
          msgId!,
          sprintId!,
          timestamp,
          userId!,
          db
        );

        res.status(200).json({ congratulatoryMessage });
      } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

  return router;
};
