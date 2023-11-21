import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

// client initialization - Gateway In
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

export const sendCongratulatoryMessage = async (channelId, msg, gifUrl) => {
  try {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      const gif = await gifUrl();
      await channel.send(msg);
      await channel.send(gif);
      return true;
    } else {
      console.error("Channel not found");
      return false;
    }
  } catch (error) {
    console.error("Error sending congratulatory message:", error);
    return false;
  }
};

client.login(process.env.DISCORD_BOT_ID);
