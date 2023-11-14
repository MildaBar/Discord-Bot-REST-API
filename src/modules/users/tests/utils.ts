import type { Insertable } from "kysely";
import type { Users } from "@/database";

export const usersFactory = (
  overrides: Partial<Insertable<Users>> = {}
): Insertable<Users> => ({
  id: 1,
  username: "johnjoe",
});

export const usersMatcher = (overrides: Partial<Insertable<Users>> = {}) => ({
  id: 1,
  ...overrides,
  ...usersFactory(overrides),
});
