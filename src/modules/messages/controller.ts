import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "./repository";
import { Database } from "@/database";
import { jsonRoute } from "@/utils/middleware";

export default (db: Database) => {
  const router = Router();
  const messages = buildRepository(db);

  router.route("/").get(
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
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: error.message });
      }
    })
  );

  return router;
};
