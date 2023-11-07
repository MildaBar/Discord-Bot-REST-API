declare module "./discordBot" {
  export function sendCongratulatoryMessage(
    channelId: string,
    msg: string
  ): Promise<boolean>;
}

export {};
