import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "../repository";
import * as schema from "../schema";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";

export default (db: Database) => {
  const router = Router();
  const sprint = buildRepository(db);

  router.route("/").patch(
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
  );

  return router;
};
