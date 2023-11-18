import createTestDatabase from "@tests/utils/createTestDatabase";
import supertest from "supertest";
import createApp from "@/app";
import { selectAllFor, createFor } from "@tests/utils/records";
import getUsersMsg from "../../services/getUsersMsg";
import { sendCongratulatoryMessage } from "../../../../../discordBot/discordBot";
import { usersFactory } from "@/modules/users/tests/utils";

const db = await createTestDatabase();
const app = createApp(db);
const selectMessages = selectAllFor(db, "messageTemplates");
const createUsersRecords = createFor(db, "users");
afterAll(() => db.destroy());

afterEach(async () => {
  // clearing the tested table after each test
  await db.deleteFrom("users").execute();
  await db.deleteFrom("messageTemplates").execute();
});

describe("GET / username", () => {
  it("should call getUsersMsg ", async () => {
    await createUsersRecords([
      usersFactory({
        username: "johnjoe",
      }),
    ]);
    const getUsersMsgSpy = vi.fn(getUsersMsg);
    const username = "johnjoe";
    await supertest(app).get(`/messages?username=${username}`).expect(200);

    const result = getUsersMsgSpy(username, db);
    expect(getUsersMsgSpy).toHaveBeenCalledWith(username, db);
    expect(getUsersMsgSpy).toHaveBeenCalled();
  });

  it("should return 404 if user not found in the database", async () => {
    const { body } = await supertest(app)
      .get("/messages?username=nameNotInDatabase")
      .expect(404);

    expect(body).toEqual({
      message: "nameNotInDatabase is not found.",
    });
  });
});

describe("GET / sprint", () => {
  it("should return 404 if sprintCode is not found in the database");
});

describe("GET /", () => {
  it("should return all messages if username not provided", async () => {
    const mesagesInDatabase = await selectMessages();

    const { body } = await supertest(app).get("/messages").expect(200);

    expect(body).toEqual(mesagesInDatabase);
  });
});
