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

describe("PATCH", () => {
  it("persists changes", async () => {
    const id = 1;
    await createMessagesRecords([messageFactory({ id })]);

    const patchResponse = await supertest(app)
      .patch("/templates")
      .send({ id, template: "Impressive work! Well done!👏" })
      .expect(200);

    const { body } = await supertest(app)
      .get("/templates")
      .send({ id })
      .expect(200);

    expect(body[0]).toEqual(
      messageMatcher({
        id,
        template: "Impressive work! Well done!👏",
      })
    );
  });
});
