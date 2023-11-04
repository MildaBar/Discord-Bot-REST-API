import { z } from "zod";
import type { Sprints } from "@/database";

// data validation
const schema = z.object({
  id: z.coerce.number().int().positive(),
  sprintCode: z.string(),
  sprintTitle: z.string(),
});

// schema version for inserting new sprint titles
const insertable = schema.omit({ id: true });

// schema version for updating existing sprints
const updateable = insertable.partial();

export const parse = (s: unknown) => schema.parse(s);

export const parseId = (id: unknown) => schema.shape.id.parse(id);

export const parseUpdateable = (s: unknown) => updateable.parse(s);

export const parseInsertable = (s: unknown) => insertable.parse(s);

export const keys: (keyof Sprints)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
