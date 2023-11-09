import { expect } from "vitest";
import type { Insertable } from "kysely";
import type { Sprints } from "@/database";

export const sprintFactory = (
  overrides: Partial<Insertable<Sprints>> = {}
): Insertable<Sprints> => ({
  sprintCode: "WD-3.1",
  sprintTitle: "Node.js and Relational Databases",
  ...overrides,
});

export const sprintMatcher = (
  overrides: Partial<Insertable<Sprints>> = {}
) => ({
  id: expect.any(Number),
  ...overrides,
  ...sprintFactory(overrides),
});
