import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import buildRepository from "../repository";
import { messageFactory, messageMatcher } from "./utils";

const db = await createTestDatabase();
const repository = buildRepository(db);
const createMessages = createFor(db, "messageTemplates");

afterAll(() => db.destroy());

afterEach(async () => {
  // clearing the tested table after each test
  await db.deleteFrom("messageTemplates").execute();
});

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

describe("findById", () => {
  it("should return messages based on id", async () => {
    await createMessages([
      messageFactory({
        id: 1,
        template: "template 1",
      }),
    ]);

    const msgId = 1;
    const messages = await repository.findById(msgId);

    expect(messages).toEqual(messageMatcher({ id: 1, template: "template 1" }));
  });
});

describe("findByMsg", () => {
  it("should return message template data based on message", async () => {
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

    const msg = "template 1";
    const messages = await repository.findByMsg(msg);
    expect(messages).toEqual(messageMatcher({ id: 1, template: "template 1" }));
  });
});
