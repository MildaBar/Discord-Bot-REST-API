import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import buildRepository from "../repository";
import * as schema from "../schema";
import { jsonRoute } from "@/utils/middleware";
import { Database } from "@/database";

export default (db: Database) => {
  const router = Router();
  const sprint = buildRepository(db);

  router.route("/").post(
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
  );
  return router;
};
