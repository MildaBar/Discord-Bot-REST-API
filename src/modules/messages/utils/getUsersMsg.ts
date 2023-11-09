import type { Database } from "@/database";
import buildUsersRepository from "../../users/repository";
import buildUsersMsgRepository from "../../congratulatoryMessages/repository";
import buildMsgRepository from "../repository";

export default async function getUsersMsg(username: string, db: Database) {
  const users = buildUsersRepository(db, username);
  const usersMsg = buildUsersMsgRepository(db);
  const messages = buildMsgRepository(db);

  if (username) {
    const userData = await users.findUser(username);
    const userId = userData?.id;

    const userMsgData = await usersMsg.finduserId(userId || 0);

    const userMsgId = userMsgData.map((msg) => msg.messageTemplateId);

    const userMsgPromises = userMsgId.map((id) => messages.findById(id));

    const userMsg = (await Promise.all(userMsgPromises))
      .filter((message) => message !== undefined)
      .map((message) => message!.template);

    return userMsg;
  }
}
