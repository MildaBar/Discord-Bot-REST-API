import type { Database } from "@/database";
import buildRepository from "../../sprints/repository";

export default async function getSprintsId(db: Database, code: string) {
  const sprintsRepo = buildRepository(db);

  const sprints = await sprintsRepo.findByCode(code);

  return sprints?.id;
}
