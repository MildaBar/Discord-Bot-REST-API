import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { congratulatoryMsgFactory } from "../tests/utils";
import insertCongratulatoryMessage from "../controller";
import { repositoryTestSetup } from "./repositoryTestSetup";

const db = await createTestDatabase();
const createCongratulatoryMsgRecord = createFor(db, "congratulatoryMessages");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("users").execute();
  await db.deleteFrom("gifs").execute();
  await db.deleteFrom("messageTemplates").execute();
  await db.deleteFrom("sprints").execute();
  await db.deleteFrom("congratulatoryMessages").execute();
});

describe("insertCongratulatoryMessage", () => {
  it("should append meta data to congratulatoryMessage table", async () => {
    await repositoryTestSetup(db);

    await createCongratulatoryMsgRecord([
      congratulatoryMsgFactory({
        id: 1,
        gifId: 1,
        messageTemplateId: 1,
        sprintId: 1,
        timestamp: "2023-11-07T08:32:15.182Z",
        userId: 1,
      }),
    ]);

    const gifId = 1;
    const messageTemplateId = 1;

    const sprintId = 1;
    const timestamp = "2023-11-07T08:32:15.182Z";
    const userId = 1;

    await insertCongratulatoryMessage(
      gifId,
      messageTemplateId,
      sprintId,
      timestamp,
      userId,
      db
    );
  });

  expect(insertCongratulatoryMessage).toBeTruthy();
});
