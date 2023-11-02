import { z } from "zod";
import type { MessageTemplates } from "@/database";

type Message = MessageTemplates;
const schema = z.object({
  id: z.coerce.number().int().positive(),
  template: z.string(),
});

export const parse = (msg: unknown) => {
  const parsedMessage = schema.parse(msg);
  if (parsedMessage.template.trim().length === 0) {
    throw new Error("Template cannot be empty.");
  }
  return parsedMessage;
};

export const keys: (keyof Message)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
