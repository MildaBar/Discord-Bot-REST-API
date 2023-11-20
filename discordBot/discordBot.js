import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import getRandomGif from "@/modules/messages/services/getRandomGif";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("bot is ready");
});

export const sendCongratulatoryMessage = async (
  channelId,
  msg,
  getRandomGif
) => {
  try {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      const gif = await getRandomGif();
      await channel.send(msg);
      await channel.send(gif);
      return true;
    } else {
      console.error("Channel not found");
      return false;
    }
  } catch (error) {
    console.error("Error senging congratulatory message:", error);
    return false;
  }
};

client.login(process.env.DISCORD_BOT_ID);
