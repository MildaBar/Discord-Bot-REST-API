import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { Database } from "@/database";
import { jsonRoute } from "@/utils/middleware";
import buildMsgRepository from "../repository";
import { checkParameters } from "../middleware/middleware";

// import services
import getUsersMsg from "../services/getUsersMsg";
import getSprintMsg from "../services/getSprintMsg";

export default (db: Database) => {
  const router = Router();
  const messages = buildMsgRepository(db);

  router.route("/").get(
    checkParameters,
    jsonRoute(async (req, res) => {
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
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ error: "Messages not found" });
          }

          return res.status(StatusCodes.OK).json(allMessages);
        } else {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Invalid request, missing or invalid parameters." });
        }
      } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
    })
  );

  return router;
};
