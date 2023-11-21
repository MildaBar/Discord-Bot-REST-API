import getRandomGif from "../src/modules/messages/services/getRandomGif";

declare module "./discordBot" {
  export function sendCongratulatoryMessage(
    channelId: string,
    msg: string,
    gif: () => string
  ): Promise<boolean>;
}

export {};
