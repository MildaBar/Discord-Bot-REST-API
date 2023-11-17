import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { messageFactory } from "../../../messages/tests/utils";
import getRandomMsg from "../getRandomMsg";

const db = await createTestDatabase();
const createMessageRecords = createFor(db, "messageTemplates");

afterAll(() => db.destroy());

vitest.mock("../getRandomMsg", () => ({
  __esModule: true,
  default: vitest.fn().mockReturnValue("Congratulations - test 1 🎉"),
}));

describe("getRandomMsg", () => {
  it("should return a random message from MessageTemplate table", async () => {
    await createMessageRecords([
      messageFactory({ id: 1, template: "Congratulations - test 1 🎉" }),
      messageFactory({ id: 2, template: "Congratulations - test 2 🔥" }),
      messageFactory({ id: 3, template: "Congratulations - test 3 🎉" }),
    ]);

    const randomMsg = await getRandomMsg(db);

    expect(randomMsg).toContain("Congratulations - test 1 🎉");
  });
});
