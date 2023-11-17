import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "../repository";
import * as schema from "../schema";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";

export default (db: Database) => {
  const router = Router();
  const template = buildRepository(db);

  router.route("/").post(
    jsonRoute(async (req, res) => {
      const body = schema.parseInsertable(req.body);
      return template.create(body);
    }, StatusCodes.CREATED)
  );
  return router;
};
