import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor, selectAllFor } from "@tests/utils/records";
import buildRepository from "../repository";
import { messageFactory, messageMatcher } from "./utils";

const db = await createTestDatabase();
const repository = buildRepository(db);
const createMessages = createFor(db, "message_templates");
const selectMessage = selectAllFor(db, "message_templates");

afterAll(() => db.destroy());

describe("findAll", () => {
  it("should return all messages", async () => {
    await createMessages([
      messageFactory({
        id: 1,
        template: "template 1",
      }),
      messageFactory({
        id: 2,
        template: "template 2",
      }),
    ]);

    const messages = await repository.findAll();

    expect(messages).toHaveLength(2);
    expect(messages[0]).toEqual(
      messageMatcher({ id: 1, template: "template 1" })
    );
    expect(messages[1]).toEqual(
      messageMatcher({ id: 2, template: "template 2" })
    );
  });
});
