import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor, selectAllFor } from "@tests/utils/records";
import buildRepository from "../repository";
import {
  congratulatoryMsgFactory,
  congratulatoryMsgMatcher,
  congratulatoryMsgFactoryFull,
} from "./utils";

import { usersFactory } from "@/modules/users/tests/utils";
import { gifFactory } from "@/modules/gifs/tests/utils";
import { messageFactory } from "@/modules/templates/tests/utils";
import { sprintFactory } from "@/modules/sprints/tests/utils";

const db = await createTestDatabase();
const repository = buildRepository(db);
const createCongratulatoryMsgRecords = createFor(db, "congratulatoryMessages");
const selectCongratulatoryMsg = selectAllFor(db, "congratulatoryMessages");

const createUsersRecords = createFor(db, "users");
const createGifsRecords = createFor(db, "gifs");
const createMessageTemplateRecords = createFor(db, "messageTemplates");
const createSprintsRecords = createFor(db, "sprints");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("congratulatoryMessages").execute();
});

describe("findAll", () => {
  it("should return all congratulatory messages data", async () => {
    await createUsersRecords([
      usersFactory({
        id: 1,
        username: "johdoe",
      }),
    ]);

    await createGifsRecords([
      gifFactory({
        id: 1,
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

    await createCongratulatoryMsgRecords([
      congratulatoryMsgFactory({
        id: 1,
        gifId: 1,
        messageTemplateId: 1,
        sprintId: 1,
        timestamp: "2023-11-07T08:32:15.182Z",
        userId: 1,
      }),
    ]);

    const foundCongratulatoryMsgData = await repository.findAll();

    expect(foundCongratulatoryMsgData).toEqual([
      {
        id: 1,
        gifId: 1,
        messageTemplateId: 1,
        sprintId: 1,
        timestamp: "2023-11-07T08:32:15.182Z",
        userId: 1,
      },
    ]);
  });
});
