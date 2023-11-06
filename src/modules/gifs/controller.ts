import { Database } from "@/database";
import buildRepository from "./repository";

export default async function insertGifUrlIntoDb(gifUrl: string, db: Database) {
  const gifs = buildRepository(db, gifUrl);

  // check if gif url already exists
  const existingGif = await gifs.findUrl(gifUrl);

  if (!existingGif) {
    try {
      await gifs.create({ gifUrl: gifUrl });
      console.log("GIF data appended successfully.");
    } catch (error) {
      console.error("An error occurred while appending GIF data:", error);
    }
  }
}
