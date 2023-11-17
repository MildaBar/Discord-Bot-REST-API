import type { Database } from "@/database";
import buildRepository from "../../sprints/repository";

export default async function getSprintTitle(sprintCode: string, db: Database) {
  const sprints = buildRepository(db);

  const sprintTitle = await sprints.findByCode(sprintCode);

  return sprintTitle;
}
