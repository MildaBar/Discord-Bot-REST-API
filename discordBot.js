import "dotenv/config";
import axios from "axios";
import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} from "discord.js";
import getRandomGif from "./src/modules/messages/utils/getRandomGif";

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

export const sendCongratulatoryMessage = async (channelId, msg) => {
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
