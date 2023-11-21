import getRandomGif from "../src/modules/messages/services/getRandomGif";

declare module "./discordBot" {
  export function sendCongratulatoryMessage(
    channelId: string,
    msg: string,
    gifUrl: () => Promise<string>
  ): Promise<boolean>;
}

export {};
