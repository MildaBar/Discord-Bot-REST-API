import type { Database } from "@/database";
import buildRepository from "../repository";

function getRandomItem(dataArray: string[]) {
  const randomIndex = Math.floor(Math.random() * dataArray.length);
  return dataArray[randomIndex];
}

export default async function getRandomMsg(db: Database) {
  const messages = buildRepository(db);

  const allMessages = await messages.findAll();

  const msg = allMessages.map((row) => {
    return row.template;
  });

  const randomMsg = getRandomItem(msg);

  return randomMsg;
}
