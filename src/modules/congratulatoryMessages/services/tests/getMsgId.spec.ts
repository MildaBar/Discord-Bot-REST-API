import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { messageFactory } from "../../../messages/tests/utils";
import getMsgId from "../getMsgId";

const db = await createTestDatabase();
const createMessagesRecords = createFor(db, "messageTemplates");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("gifs").execute();
});

describe("getMsgId", () => {
  it("should return message template ID based on message", async () => {
    await createMessagesRecords([
      messageFactory({
        id: 1,
        template: "Impressive work! Well done!👏",
      }),
    ]);

    const msg = "Impressive work! Well done!👏";
    const msgId = await getMsgId(db, msg);

    expect(msgId).toEqual(1);
  });
});
