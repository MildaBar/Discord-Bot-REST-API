import type { Database } from "@/database";
import buildRepository from "../../gifs/repository";

export default async function getGif(db: Database, gifUrl: string) {
  const gifRepo = buildRepository(db, gifUrl);

  const gifs = await gifRepo.findUrl(gifUrl);

  if (!gifs) {
    await gifRepo.create({ gifUrl });
  }

  return gifs?.id;
}
