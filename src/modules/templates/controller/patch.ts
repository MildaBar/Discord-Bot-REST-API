import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "../repository";
import * as schema from "../schema";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";

export default (db: Database) => {
  const router = Router();
  const template = buildRepository(db);

  router.route("/").patch(
    jsonRoute(async (req, res) => {
      const id = schema.parseId(req.body.id);
      const bodyPatch = schema.parseUpdateable(req.body);
      const updatedTemplate = await template.update(id, bodyPatch);

      if (!updatedTemplate) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Template not found" });
      }

      return updatedTemplate;
    })
  );
  return router;
};
