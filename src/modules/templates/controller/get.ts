import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "../repository";
import * as schema from "../schema";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";

export default (db: Database) => {
  const router = Router();
  const template = buildRepository(db);

  router.route("/").get(
    jsonRoute(async (req, res) => {
      try {
        const allTemplates = await template.findAll();

        if (!allTemplates) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "Template not found" });
        }

        return res.status(StatusCodes.OK).json(allTemplates);
      } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
    })
  );
  return router;
};
