import { Database } from "@/database";
import buildRepository from "./repository";

export default async function insertCongratulatoryMessage(
  gifId: number,
  messageTemplateId: number,
  sprintId: number,
  timestamp: string,
  userId: number,
  db: Database
) {
  const congratulatoryMsg = buildRepository(db);

  // check if user already exists
  const existingCongratulatoryMsg = await congratulatoryMsg.findAll();

  if (!existingCongratulatoryMsg) {
    try {
      await congratulatoryMsg.create({
        gifId,
        messageTemplateId,
        sprintId,
        timestamp,
        userId,
      });
      console.log("CONGRATULATORY MESSAGE data appended successfully.");
    } catch (error) {
      console.error(
        "An error occurred while appending CONGRATULATORY MESSAGE data:",
        error
      );
    }
  }
}
