import { z } from "zod";
import type { MessageTemplates } from "@/database";

type Message = MessageTemplates;
const schema = z.object({
  id: z.coerce.number().int().positive(),
  template: z.string(),
});

// schema version for inserting new messages
const insertable = schema.omit({ id: true });

// schema version for updating existing messages
const updateable = insertable.partial();

export const parse = (temp: unknown) => {
  const parsedTemplate = schema.parse(temp);
  if (parsedTemplate.template.trim().length === 0) {
    throw new Error("Template cannot be empty.");
  }
  return parsedTemplate;
};

export const parseInsertable = (temp: unknown) => insertable.parse(temp);

export const parseId = (id: unknown) => schema.shape.id.parse(id);

export const parseUpdateable = (temp: unknown) => updateable.parse(temp);

export const keys: (keyof Message)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
