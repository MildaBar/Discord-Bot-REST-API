import supertest from "supertest";
import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { messageFactory, messageMatcher } from "../../tests/utils";
import createApp from "@/app";

const db = await createTestDatabase();
const app = createApp(db);

const createMessagesRecords = createFor(db, "messageTemplates");

afterEach(async () => {
  // clear the tested table after each test
  await db.deleteFrom("messageTemplates").execute();
});

// close the database connection aftert all tests
afterAll(() => db.destroy());

describe("GET", () => {
  it("should return a list of existing articles", async () => {
    await createMessagesRecords([
      messageFactory({
        template: "Impressive work! Well done!👏",
      }),
    ]);

    const { body } = await supertest(app).get("/templates").expect(200);

    expect(body).toEqual([
      messageMatcher({
        template: "Impressive work! Well done!👏",
      }),
    ]);
  });
});
