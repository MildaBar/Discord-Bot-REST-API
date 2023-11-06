import { number, z } from "zod";
import type { CongratulatoryMessages } from "@/database";

type msgData = CongratulatoryMessages;
const schema = z.object({
  gifId: z.number().int().positive(),
  id: z.coerce.number().int().positive(),
  messageTemplateId: z.number().int().positive(),
  sprintId: z.number().int().positive(),
  timestamp: z.string(),
  userId: z.number().int().positive(),
});

const insertable = schema.omit({ id: true });
const updateable = insertable.partial();

export const parse = (md: unknown) => schema.parse(md);

export const parseInsertable = (md: unknown) => insertable.parse(md);

export const keys: (keyof msgData)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
