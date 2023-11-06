import type { Database } from "@/database";
import buildRepository from "../../users/repository";

export default async function getUsersId(db: Database, username: string) {
  const usersRepo = buildRepository(db, username);

  const usersId = await usersRepo.findUser(username);

  if (!usersId) {
    await usersRepo.create({ username });
  }

  return usersId?.id;
}
