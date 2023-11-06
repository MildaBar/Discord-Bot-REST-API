import "dotenv/config";
import axios from "axios";
import { Client, GatewayIntentBits } from "discord.js";

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

export const sendCongratulatoryMessage = (channelId, msg) => {
  const channel = client.channels.cache.get(channelId);

  if (channel) {
    channel.send(msg);
  } else {
    console.error("Channel not found");
  }
};

client.login(process.env.DISCORD_BOT_ID);
