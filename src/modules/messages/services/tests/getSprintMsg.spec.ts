import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { repositoryTestSetup } from "@/modules/congratulatoryMessages/tests/repositoryTestSetup";
import getSprintMsg from "../getSprintMsg";
import { congratulatoryMsgFactory } from "../../../congratulatoryMessages/tests/utils";

const db = await createTestDatabase();
const sprintCode = "WD-3.1";

const createUsersMsgRecords = createFor(db, "congratulatoryMessages");

describe("getSprintMsg", () => {
  it("should return specific sprint messages", async () => {
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

    const sprintMsg = await getSprintMsg(sprintCode, db);

    expect(sprintMsg).toEqual(["Impressive work! Well done!👏"]);
  });
});
