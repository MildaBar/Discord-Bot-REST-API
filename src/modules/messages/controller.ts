import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "./repository";
import { Database } from "@/database";
import { jsonRoute } from "@/utils/middleware";
import getRandomMsg from "./utils/getRandomMsg";
import getSprintTitle from "./utils/getSprintTitle";
import getRandomGif from "./utils/getRandomGif";

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
        const { username, sprintCode } = req.body;

        const sprint = await getSprintTitle(sprintCode, db);
        const sprintTitle = sprint?.sprintTitle;
        const randomMessage = await getRandomMsg(db);
        const gif = await getRandomGif();

        const congratulatoryMessage = `@${username} has just completed ${sprintTitle}! ${randomMessage} ${gif}`;

        res.status(200).json({ congratulatoryMessage });
      } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

  return router;
};
