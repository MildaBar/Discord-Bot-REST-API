import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "../repository";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";

export default (db: Database) => {
  const router = Router();
  const sprint = buildRepository(db);

  router.route("/").get(
    jsonRoute(async (req, res) => {
      try {
        const allSprints = await sprint.findAll();

        if (!allSprints) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "Sprint data not found " });
        }

        return res.status(StatusCodes.OK).json(allSprints);
      } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
    })
  );

  return router;
};
