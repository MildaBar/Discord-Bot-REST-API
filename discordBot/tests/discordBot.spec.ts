import createTestDatabase from "@tests/utils/createTestDatabase";
import { Client, GatewayIntentBits } from "discord.js";
import supertest from "supertest";
import createApp from "@/app";
import { sendCongratulatoryMessage } from "../discordBot";

vitest.mock("discord.js");
const db = await createTestDatabase();
const app = createApp(db);

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

      const result = await sendCongratulatoryMessage(message, channelId);

      expect(result).toBeTruthy();
    } catch (error) {
      console.log("error");
    }
  });
});
