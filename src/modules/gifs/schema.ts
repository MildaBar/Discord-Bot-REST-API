import { z } from "zod";
import type { Gifs } from "@/database";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  gifUrl: z.string(),
});

const insertable = schema.omit({ id: true });

const updateable = insertable.partial();

export const parse = (gif: unknown) => schema.parse(gif);

export const parseUpdateable = (gif: unknown) => updateable.parse(gif);

export const keys: (keyof Gifs)[] = Object.keys(schema.shape) as (keyof z.infer<
  typeof schema
>)[];
