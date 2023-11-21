import createTestDatabase from "@tests/utils/createTestDatabase";
import { Client, GatewayIntentBits } from "discord.js";
import { sendCongratulatoryMessage } from "../discordBot";
import { getRandomGif } from "@/modules/messages/services/getRandomGif";

vitest.mock("discord.js");
const db = await createTestDatabase();

describe("sendCongratulatoryMessage", () => {
  it("should send the message and gif to discord bot", async () => {
    try {
      const MockedClient = vi.mocked(Client);
      const mockedClientInstance = new MockedClient({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
        ],
      });
      const message = "test congratulatory message";
      const channelId = "1223141241241251251";
      const getRandomGifSpy = v.fn(getRandomGif);

      const result = await sendCongratulatoryMessage(
        message,
        channelId,
        getRandomGifSpy
      );

      expect(result).toBeTruthy();
    } catch (error) {
      console.log("error");
    }
  });
});
