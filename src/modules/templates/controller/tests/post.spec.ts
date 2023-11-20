import supertest from "supertest";
import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor, selectAllFor } from "@tests/utils/records";
import { messageFactory, messageMatcher } from "../../tests/utils";
import createApp from "@/app";

const db = await createTestDatabase();
const app = createApp(db);

const createMessagesRecords = createFor(db, "messageTemplates");
const selectMessagesRecords = selectAllFor(db, "messageTemplates");

afterEach(async () => {
  // clear the tested table after each test
  await db.deleteFrom("messageTemplates").execute();
});

// close the database connection aftert all tests
afterAll(() => db.destroy());

describe("POST", () => {
  it("should return 201 and created message templates", async () => {
    const { body } = await supertest(app)
      .post("/templates")
      .send(messageFactory())
      .expect(201);

    const messagesInDatabase = selectMessagesRecords();
    expect(messagesInDatabase).contains(body);
  });
});
