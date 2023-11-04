import { z } from "zod";
import type { Sprints } from "@/database";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  sprintCode: z.string(),
  sprintTitle: z.string(),
});

//

export const parse = (s: unknown) => schema.parse(s);

export const keys: (keyof Sprints)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
