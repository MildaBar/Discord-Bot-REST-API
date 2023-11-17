import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { Database } from "@/database";
import { jsonRoute } from "@/utils/middleware";
import buildMsgRepository from "../repository";

// import services
import getUsersMsg from "../services/getUsersMsg";
import getSprintMsg from "../services/getSprintMsg";

// import users
import buildUserRepository from "@/modules/users/repository";

export default (db: Database) => {
  const router = Router();
  const messages = buildMsgRepository(db);

  router.route("/").get(
    jsonRoute(async (req, res) => {
      try {
        const username = req.query.username as string;
        const sprintId = req.query.sprint as string;

        if (!username && !sprintId) {
          // return all messages
          const allMessages = await messages.findAll();

          if (!allMessages) {
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ error: "Messages not found" });
          }

          return res.status(StatusCodes.OK).json(allMessages);
        } else if (username) {
          // fetch messages for a specific user
          const userMsg = await getUsersMsg(username, db);

          // check username
          const user = buildUserRepository(db, username);
          const checkUsername = await user.findUser(username);

          if (checkUsername?.username === undefined) {
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: `${username} is not found.` });
          } else if (userMsg) {
            return res.status(StatusCodes.OK).json({ messages: userMsg });
          } else {
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ error: "Sprint messages not found." });
          }
        } else if (sprintId) {
          // fetch messages for a specific sprint
          const sprintMsg = await getSprintMsg(sprintId, db);

          if (sprintMsg !== undefined) {
            if (sprintMsg.length === 0) {
              return res.status(StatusCodes.OK).json({
                message: `For ${sprintId} there are no congratulatory messages.`,
              });
            } else if (sprintMsg) {
              return res.status(StatusCodes.OK).json({ message: sprintMsg });
            }
          } else {
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: `${sprintId} not found` });
          }
        }
      } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
    })
  );
  return router;
};
