import { expect } from "vitest";
import type { Insertable } from "kysely";
import type { MessageTemplates } from "@/database";

export const messageFactory = (
  overrides: Partial<Insertable<MessageTemplates>> = {}
): Insertable<MessageTemplates> => ({
  template: "Impressive work! Well done!👏",
  ...overrides,
});

export const messageFactoryFull = (
  overrides: Partial<Insertable<MessageTemplates>> = {}
): MessageTemplates => ({
  id: expect.any(Number),
  ...messageFactory(overrides),
});

export const messageMatcher = (
  overrides: Partial<Insertable<MessageTemplates>> = {}
) => ({
  id: expect.any(Number),
  ...messageFactory(overrides),
  ...overrides,
});
