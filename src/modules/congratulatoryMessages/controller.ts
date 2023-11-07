import { Database } from "@/database";
import buildRepository from "./repository";

export default async function insertCongratulatoryMessage(
  gifId: number,
  messageTemplateId: number,
  sprintId: number,
  timestamp: string,
  userId: number,
  db: Database
): Promise<boolean> {
  const congratulatoryMsg = buildRepository(db);

  try {
    await congratulatoryMsg.create({
      gifId,
      messageTemplateId,
      sprintId,
      timestamp,
      userId,
    });
    console.log("CONGRATULATORY MESSAGE data appended successfully.");
    return true;
  } catch (error) {
    console.error(
      "An error occurred while appending CONGRATULATORY MESSAGE data:",
      error
    );
    return false;
  }
}
