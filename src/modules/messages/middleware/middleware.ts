import { StatusCodes } from "http-status-codes";
import buildMsgRepository from "../repository";
import createDatabase from "@/database/index";
import dotenv from "dotenv";
import getSprintMsg from "../services/getSprintMsg";
import buildUserRepository from "@/modules/users/repository";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const DATABASE = process.env.DATABASE_URL;

if (!DATABASE) {
  throw new Error("No DATABASE_URL provided in the environment variables");
}

const DB = createDatabase(DATABASE);

export async function checkParameters(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.query.username as string;
  const sprintCode = req.query.sprint as string;

  if (username || sprintCode) {
    if (username && username !== "") {
      const user = buildUserRepository(DB, username);
      const checkUsername = await user.findUser(username);

      if (checkUsername?.username === undefined) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: `${username} is not found.` });
      } else if (checkUsername) {
        req.messagesTarget = "user";
        next();
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid request, missing or invalid parameters." });
      }
    } else if (sprintCode && sprintCode !== "") {
      const sprintMsg = await getSprintMsg(sprintCode, DB);

      if (sprintMsg === undefined) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: `${sprintCode} not found` });
      } else if (sprintMsg.length === 0) {
        return res.status(StatusCodes.OK).json({
          message: `For ${sprintCode} there are no congratulatory messages.`,
        });
      } else if (sprintCode) {
        req.messagesTarget = "sprint";
        next();
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid request, missing or invalid parameters." });
      }
    }
  } else {
    req.messagesTarget = "messages";
    next();
  }
}
