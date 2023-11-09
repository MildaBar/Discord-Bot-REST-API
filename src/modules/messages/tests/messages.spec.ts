import createTestDatabase from "@tests/utils/createTestDatabase";
import supertest from "supertest";
import createApp from "@/app";
import { createFor, selectAllFor } from "@tests/utils/records";
import buildRepository from "../repository";
import { messageFactory, messageMatcher } from "./utils";

const db = await createTestDatabase();
const app = createApp(db);
const createMessages = createFor(db, "messageTemplates");

afterAll(() => db.destroy());

afterEach(async () => {
  // clearing the tested table after each test
  await db.deleteFrom("messageTemplates").execute();
});

describe("Congratulatory Messages API", () => {
  it("GET / should return all messages for a user", async () => {
    await createMessages([
      messageFactory({
        id: 1,
        template: "template 1",
      }),
    ]);
    const response = await supertest(app)
      .get("/messages?username=JohnJoe")
      .expect(200);
    const { body } = response;
    expect(body).toEqual({
      messages: ["template 1"],
    });
  });
});
// it("GET / should return all messages if username not provided", async () => {
//   const res = await request(app).get("/");
//   expect(res.status).toEqual(200); // Assuming 200 for success
//   expect(res.body).toHaveProperty("messages");
// });

// it("POST / should send congratulatory message and return success", async () => {
//   const data = {
//     username: "testUser",
//     sprintCode: "SPR-001",
//     channelId: "testChannelId",
//   };
//   const res = await request(app).post("/").send(data);
//   expect(res.status).toEqual(200); // Assuming 200 for success
//   expect(res.body).toHaveProperty("congratulatoryMessage");
// });
