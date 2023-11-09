import supertest from "supertest";
import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { messageFactory, messageMatcher } from "./utils";
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
      messageFactory(),
      messageFactory({
        template: "Impressive work! Well done!👏",
      }),
    ]);

    const { body } = await supertest(app).get("/templates").expect(200);

    expect(body).toEqual([
      messageMatcher(),
      messageMatcher({
        template: "Impressive work! Well done!👏",
      }),
    ]);
  });
});

describe("POST", () => {
  it("should return 201 and created message template", async () => {
    const { body } = await supertest(app)
      .post("/templates")
      .send(messageFactory())
      .expect(201);

    expect(body).toEqual(messageMatcher());
  });
});

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

describe("DELETE", () => {
  it("should delete template based on id", async () => {
    const id = 1;
    await supertest(app).delete("/templates").send({ id }).expect(200);
  });
});
