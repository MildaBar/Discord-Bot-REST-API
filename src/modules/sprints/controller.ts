import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "./repository";
import * as schema from "./schema";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";

export default (db: Database) => {
  const router = Router();
  const sprint = buildRepository(db);

  router
    .route("/")
    .get(
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
    )
    .post(
      jsonRoute(async (req, res) => {
        const body = schema.parseInsertable(req.body);

        if (!body || body.sprintCode.trim().length === 0) {
          return res
            .status(400)
            .json({ error: "Invalid request. Provide all the required data." });
        }

        try {
          const result = await sprint.create(body);
          return res.status(StatusCodes.CREATED).json(result);
        } catch (error) {
          console.error("Error occurred during sprint creation:", error);
          return res.status(500).json({ error: "Internal Server Error." });
        }
      })
    )
    .patch(
      jsonRoute(async (req, res) => {
        const id = schema.parseId(req.body.id);
        const bodyPatch = schema.parseUpdateable(req.body);
        const updatedSprintData = await sprint.update(id, bodyPatch);

        if (!updatedSprintData) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "Sprint data not found" });
        }
        return updatedSprintData;
      })
    )
    .delete(
      jsonRoute(async (req, res) => {
        const id = schema.parseId(req.body.id);
        await sprint.remove(id);
        return res
          .status(StatusCodes.OK)
          .json({ message: "Sprint data deleted" });
      })
    );
  return router;
};
