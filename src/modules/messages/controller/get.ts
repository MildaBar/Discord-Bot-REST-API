import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { Database } from "@/database";
import { jsonRoute } from "@/utils/middleware";
import buildMsgRepository from "../repository";
import { checkParameters } from "../middleware/validateParameters";
import NotFoundError from "@/utils/errors/NotFoundError";
import BadRequestError from "@/utils/errors/BadRequestError";
import { errorHandler } from "../middleware/errorHandler";

// import services
import getUsersMsg from "../services/getUsersMsg";
import getSprintMsg from "../services/getSprintMsg";

export default (db: Database) => {
  const router = Router();
  const messages = buildMsgRepository(db);

  router.route("/").get(
    checkParameters,
    jsonRoute(async (req, res, next) => {
      try {
        const messagesTarget = req.messagesTarget;

        if (messagesTarget === "user") {
          const username = req.query.username as string;
          const userMsg = await getUsersMsg(username, db);

          return res.status(StatusCodes.OK).json({ messages: userMsg });
        } else if (messagesTarget === "sprint") {
          const sprintCode = req.query.sprint as string;
          const sprintMsg = await getSprintMsg(sprintCode, db);

          return res.status(StatusCodes.OK).json({ message: sprintMsg });
        } else if (messagesTarget === "messages") {
          const allMessages = await messages.findAll();

          if (!allMessages) {
            throw new NotFoundError("Messages not found");
          }

          return res.status(StatusCodes.OK).json(allMessages);
        } else {
          throw new BadRequestError(
            "Invalid request, missing or invalid parameters."
          );
        }
      } catch (error) {
        console.error("Error in GET /messages route:", error);
        errorHandler(error, req, res, next);
      }
    })
  );

  return router;
};
