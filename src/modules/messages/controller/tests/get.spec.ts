import createTestDatabase from "@tests/utils/createTestDatabase";
import supertest from "supertest";
import createApp from "@/app";
import { selectAllFor, createFor } from "@tests/utils/records";
import getUsersMsg from "../../services/getUsersMsg";
import { usersFactory } from "@/modules/users/tests/utils";
import { sprintFactory } from "@/modules/sprints/tests/utils";
import { messageFactory } from "../../tests/utils";
import getSprintMsg from "../../services/getSprintMsg";

const db = await createTestDatabase();
const app = createApp(db);
const selectMessages = selectAllFor(db, "messageTemplates");
const createMessagesRecords = createFor(db, "messageTemplates");
const createUsersRecords = createFor(db, "users");
const createSprintsRecords = createFor(db, "sprints");
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
    const username = "nameNotInDatabase";
    const { body } = await supertest(app)
      .get(`/messages?username=${username}`)
      .expect(404);

    expect(body).toEqual({
      message: `${username} is not found.`,
    });
  });
});

describe("GET / sprint", () => {
  it("should return 404 if sprintCode is not found in the database", async () => {
    const sprintCode = "WD-1";
    await createMessagesRecords([
      messageFactory({
        template: "Impressive work! Well done!👏",
      }),
    ]);
    await createSprintsRecords([
      sprintFactory({
        sprintCode: "WD-3.1",
        sprintTitle: "Node.js and Relational Databases",
      }),
    ]);

    const { body } = await supertest(app).get(`/messages?sprint=${sprintCode}`);

    expect(body).toEqual({ message: `${sprintCode} not found` });
  });

  it("should call getSprintMsg", async () => {
    const sprintCode = "WD-3.1";
    const getSprintMsgSpy = vi.fn(getSprintMsg);
    await supertest(app).get(`/messages?sprint=${sprintCode}`).expect(200);

    const result = getSprintMsgSpy(sprintCode, db);
    expect(getSprintMsgSpy).toHaveBeenCalledWith(sprintCode, db);
    expect(getSprintMsgSpy).toHaveBeenCalled();
  });
});

describe("GET /", () => {
  it("should return all messages if username not provided", async () => {
    const mesagesInDatabase = await selectMessages();

    const { body } = await supertest(app).get("/messages").expect(200);

    expect(body).toEqual(mesagesInDatabase);
  });
});
