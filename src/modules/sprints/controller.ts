import { Router, json } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "./repository";
import * as schema from "./schema";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";
import { update } from "lodash";

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
        return sprint.create(body);
      }, StatusCodes.CREATED)
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
