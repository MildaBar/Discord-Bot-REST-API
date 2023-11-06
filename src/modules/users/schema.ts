import { z } from "zod";
import type { Users } from "@/database";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  username: z.string(),
});

const insertable = schema.omit({ id: true });
const updateable = insertable.partial();

export const parse = (u: unknown) => schema.parse(u);

export const parseInsertable = (u: unknown) => insertable.parse(u);

export const keys: (keyof Users)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
