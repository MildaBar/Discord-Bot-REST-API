import type { Database } from "@/database";
import buildRepository from "../../congratulatoryMessages/repository";
import buildSprintRepository from "../../sprints/repository";
import buildMsgTemplateRepository from "../../templates/repository";

export default async function getSprintMsg(sprintCode: string, db: Database) {
  const sprintMsgRepository = buildRepository(db);
  const sprintRepository = buildSprintRepository(db);
  const msgTemplateRepository = buildMsgTemplateRepository(db);

  const sprint = await sprintRepository.findByCode(sprintCode);
  const sprintId = sprint?.id;

  if (sprintId) {
    const sprintMsgArray = await sprintMsgRepository.findMsgTemplate(sprintId);

    const sprintMsgTemplateIds = sprintMsgArray.map(
      (id) => id.messageTemplateId
    );

    const templates = await Promise.all(
      sprintMsgTemplateIds.map((id) => msgTemplateRepository.findById(id))
    );

    const templatesArray = templates.map((template) => template?.template);

    return templatesArray;
  } else {
    console.log("No sprint ID found.");
  }
}
