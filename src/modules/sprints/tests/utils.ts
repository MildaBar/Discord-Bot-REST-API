import { expect } from "vitest";
import type { Insertable } from "kysely";
import type { Sprints } from "@/database";

export const sprintFactory = (
  overrides: Partial<Insertable<Sprints>> = {}
): Insertable<Sprints> => ({
  id: 1,
  sprintTitle: "First Steps Into Programming with Python: Project",
  sprintCode: "WD-1.1",
});

export const sprintMatcher = (
  overrides: Partial<Insertable<Sprints>> = {}
) => ({
  id: 1,
  ...overrides,
  ...sprintFactory(overrides),
});
