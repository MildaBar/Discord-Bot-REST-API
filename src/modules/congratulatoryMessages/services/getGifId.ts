import type { Database } from "@/database";
import buildRepository from "../../gifs/repository";

export default async function getGif(db: Database, gifUrl: string) {
  const gifRepo = buildRepository(db, gifUrl);

  let gifId = null;

  const gifData = await gifRepo.findUrl(gifUrl);

  if (!gifData) {
    const createGif = await gifRepo.create({ gifUrl });
    gifId = createGif?.id;
  } else {
    gifId = gifData.id;
  }

  return gifId;
}
