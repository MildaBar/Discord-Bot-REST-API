import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import buildRepository from "../repository";
import { repositoryTestSetup } from "./repositoryTestSetup";
import { congratulatoryMsgFactory } from "./utils";

const db = await createTestDatabase();
const repository = buildRepository(db);
const createCongratulatoryMsgRecords = createFor(db, "congratulatoryMessages");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("users").execute();
  await db.deleteFrom("gifs").execute();
  await db.deleteFrom("messageTemplates").execute();
  await db.deleteFrom("sprints").execute();
  await db.deleteFrom("congratulatoryMessages").execute();
});

describe("findAll", () => {
  it("should return all congratulatory messages data", async () => {
    await repositoryTestSetup(db);

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
