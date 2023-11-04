import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor, selectAllFor } from "@tests/utils/records";
import buildRepository from "../repository";
import { messageFactory, messageMatcher } from "./utils";

const db = await createTestDatabase();
const repository = buildRepository(db);
const createMessages = createFor(db, "messageTemplates");
const selectMessages = selectAllFor(db, "messageTemplates");

afterAll(() => db.destroy());

afterEach(async () => {
  // clearing the tested table after each test
  await db.deleteFrom("messageTemplates").execute();
});

describe("findById", () => {
  it("should return a message by id", async () => {
    const [message] = await createMessages(
      messageFactory({
        id: 1,
      })
    );

    const foundMessage = await repository.findById(message!.id);

    expect(foundMessage).toEqual(messageMatcher());
  });
});

describe("create", () => {
  it("should create a message", async () => {
    const message = await repository.create({
      template: "template 1",
    });

    expect(message).toEqual({
      id: expect.any(Number),
      template: "template 1",
    });

    const messageInDatabase = await selectMessages();
    expect(messageInDatabase).toEqual([message]);
  });
});

describe("update", () => {
  it("should update the message", async () => {
    const [message] = await createMessages(messageFactory());

    const updateMessage = await repository.update(message.id, {
      template: "template 1",
    });

    expect(updateMessage).toMatchObject(
      messageMatcher({
        template: "template 1",
      })
    );
  });
});

describe("remove", () => {
  it("should remove a message", async () => {
    const [message] = await createMessages(messageFactory());

    const removeMessage = await repository.remove(message.id);

    expect(removeMessage).toEqual(messageMatcher());
  });
});
