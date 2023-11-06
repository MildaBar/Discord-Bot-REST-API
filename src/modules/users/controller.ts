import { Database } from "@/database";
import buildRepository from "./repository";

export default async function insertUsersData(username: string, db: Database) {
  const users = buildRepository(db, username);

  // check if user already exists
  const existingUser = await users.findUser(username);

  if (!existingUser) {
    try {
      await users.create({ username: username });
      console.log("USERS data appended successfully.");
    } catch (error) {
      console.error("An error occurred while appending USERS data:", error);
    }
  }
}
