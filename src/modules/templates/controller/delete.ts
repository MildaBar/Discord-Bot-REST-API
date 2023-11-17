import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "../repository";
import * as schema from "../schema";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";

export default (db: Database) => {
  const router = Router();
  const template = buildRepository(db);

  router.route("/").delete(
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
