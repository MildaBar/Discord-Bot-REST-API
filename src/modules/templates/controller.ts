import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "./repository";
import * as schema from "./schema";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";
import { update } from "lodash";

export default (db: Database) => {
  const router = Router();
  const template = buildRepository(db);

  router
    .route("/")
    .get(
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
    )
    .post(
      jsonRoute(async (req, res) => {
        const body = schema.parseInsertable(req.body);
        return template.create(body);
      }, StatusCodes.CREATED)
    )
    .patch(
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
    )
    .delete(
      jsonRoute(async (req, res) => {
        const id = schema.parseId(req.body.id);
        await template.remove(id);
        return res
          .status(StatusCodes.OK)
          .json({ message: "Template successfully deleted" });
      })
    );
  return router;
};
