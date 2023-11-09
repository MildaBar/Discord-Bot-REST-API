import { createFor } from "@tests/utils/records";
import { usersFactory } from "@/modules/users/tests/utils";
import { gifFactory } from "@/modules/gifs/tests/utils";
import { messageFactory } from "@/modules/templates/tests/utils";
import { sprintFactory } from "@/modules/sprints/tests/utils";
import { type Database } from "../../../database";

export const repositoryTestSetup = async (db: Database) => {
  const createUsersRecords = createFor(db, "users");
  const createGifsRecords = createFor(db, "gifs");
  const createMessageTemplateRecords = createFor(db, "messageTemplates");
  const createSprintsRecords = createFor(db, "sprints");

  await createUsersRecords([
    usersFactory({
      username: "johdoe",
    }),
  ]);
  console.log("Creating users records...");

  await createGifsRecords([
    gifFactory({
      gifUrl: "test url",
    }),
  ]);

  await createSprintsRecords([
    sprintFactory({
      sprintCode: "WD-3.1",
      sprintTitle: "Node.js and Relational Databases",
    }),
  ]);

  await createMessageTemplateRecords([
    messageFactory({
      template: "Impressive work! Well done!👏",
    }),
  ]);
  console.log("Creating createMessageTemplateRecords records...");
};
