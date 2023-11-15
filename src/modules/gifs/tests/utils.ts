import type { Insertable } from "kysely";
import type { Gifs } from "@/database";

export const gifFactory = (
  overrides: Partial<Insertable<Gifs>> = {}
): Insertable<Gifs> => ({
  id: 1,
  gifUrl: "test url",
});

export const gifMatcher = (overrides: Partial<Insertable<Gifs>> = {}) => ({
  id: 1,
  ...overrides,
  ...gifFactory(overrides),
});
