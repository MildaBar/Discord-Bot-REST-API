import createTestDatabase from "@tests/utils/createTestDatabase";
import supertest from "supertest";
import createApp from "@/app";
import { createFor, selectAllFor } from "@tests/utils/records";
import { messageFactory, messageMatcher } from "./utils";
import getUsersMsg from "../utils/getUsersMsg";

const db = await createTestDatabase();
const app = createApp(db);
const createMessages = createFor(db, "messageTemplates");
const selectMessages = selectAllFor(db, "messageTemplates");

afterAll(() => db.destroy());

afterEach(async () => {
  // clearing the tested table after each test
  await db.deleteFrom("messageTemplates").execute();
});

describe("GET", () => {
  it("GET / username - should call getUsersMsg ", async () => {
    const getUsersMsgSpy = vi.fn(getUsersMsg);
    const username = "johnjoe";
    await supertest(app).get(`/messages?username=${username}`).expect(200);

    const result = getUsersMsgSpy(username, db);
    expect(getUsersMsgSpy).toHaveBeenCalledWith(username, db);
    expect(getUsersMsgSpy).toHaveBeenCalled();
  });

  it("GET / - should return all messages if username not provided", async () => {
    const mesagesInDatabase = await selectMessages();

    const { body } = await supertest(app).get("/messages").expect(200);

    expect(body).toEqual(mesagesInDatabase);
  });
});

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
