import type { Database } from "@/database";
import buildRepository from "../../messages/repository";

export default async function getMsgId(db: Database, message: string) {
  const templateRepo = buildRepository(db);

  const templates = await templateRepo.findByMsg(message);

  return templates?.id;
}
