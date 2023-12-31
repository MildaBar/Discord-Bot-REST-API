import createTestDatabase from "@tests/utils/createTestDatabase";
import supertest from "supertest";
import createApp from "@/app";
import { selectAllFor, createFor } from "@tests/utils/records";
import { sendCongratulatoryMessage } from "../../../../../discordBot/discordBot";
import { getRandomGif } from "@/modules/messages/services/getRandomGif";

const db = await createTestDatabase();
const app = createApp(db);
afterAll(() => db.destroy());

afterEach(async () => {
  // clearing the tested table after each test
  await db.deleteFrom("users").execute();
  await db.deleteFrom("messageTemplates").execute();
});

describe("POST", () => {
  it("POST / should send congratulatory message and return success", async () => {
    const data = {
      username: "testUser",
      sprintCode: "SPR-001",
      channelId: "testChannelId",
    };

    await supertest(app).post("/messages").send(data);

    const sendCongratulatoryMessageSpy = vi.fn(sendCongratulatoryMessage);
    const getRandomGifSpy = vi.fn(getRandomGif);

    await sendCongratulatoryMessageSpy(
      data.channelId,
      data.username,
      getRandomGifSpy
    );

    expect(sendCongratulatoryMessageSpy).toHaveBeenCalledWith(
      data.channelId,
      data.username,
      getRandomGifSpy
    );
    expect(sendCongratulatoryMessageSpy).toHaveBeenCalled();
  });
});
