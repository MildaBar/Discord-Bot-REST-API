import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor, selectAllFor } from "@tests/utils/records";
import buildMsgRepository from "../../repository";
import buildUsersRepository from "../../../users/repository";
import buildUsersMsgRepository from "../../../congratulatoryMessages/repository";
import { repositoryTestSetup } from "@/modules/congratulatoryMessages/tests/repositoryTestSetup";

import { congratulatoryMsgFactory } from "../../../congratulatoryMessages/tests/utils";
import { messageFactory } from "../tests/utils";
import { usersFactory } from "../tests/utils";

import getUsersMsg from "../getUsersMsg";

const username = "johdoe";
const db = await createTestDatabase();
const usersRepository = buildUsersMsgRepository(db);
const usersMsgRepository = buildUsersRepository(db, username);
const messagesRepository = buildMsgRepository(db);

const createMessageTemplateRecords = createFor(db, "messageTemplates");
const createUsersRecords = createFor(db, "users");
const createUsersMsgRecords = createFor(db, "congratulatoryMessages");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("users").execute();
  await db.deleteFrom("messageTemplates").execute();
});

describe("getUsersMsg", () => {
  it("should retrieve congratulatory message for a user", async () => {
    await repositoryTestSetup(db);

    await createUsersMsgRecords([
      congratulatoryMsgFactory({
        id: 1,
        gifId: 1,
        messageTemplateId: 1,
        sprintId: 1,
        timestamp: "2023-11-07T08:32:15.182Z",
        userId: 1,
      }),
    ]);

    const usersMsgs = await getUsersMsg(username, db);

    expect(usersMsgs).toEqual(["Impressive work! Well done!👏"]);
  });
});
