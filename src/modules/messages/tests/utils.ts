import { expect } from "vitest";
import type { Insertable } from "kysely";
import type { MessageTemplates } from "@/database";

export const messageFactory = (
  overrides: Partial<Insertable<MessageTemplates>> = {}
): Insertable<MessageTemplates> => ({
  id: 1,
  template: "Impressive work! Well done!👏",
  ...overrides,
});

export const messageFactoryFull = (
  overrides: Partial<Insertable<MessageTemplates>> = {}
): MessageTemplates => ({
  id: 2,
  ...messageFactory(overrides),
});

export const messageMatcher = (
  overrides: Partial<Insertable<MessageTemplates>> = {}
) => ({
  id: expect.any(Number),
  ...overrides,
  ...messageFactory(overrides),
});
