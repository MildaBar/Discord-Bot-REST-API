import { expect } from "vitest";
import type { Insertable } from "kysely";
import type { CongratulatoryMessages } from "@/database";

export const congratulatoryMsgFactory = (
  overrides: Partial<Insertable<CongratulatoryMessages>> = {}
): Insertable<CongratulatoryMessages> => ({
  id: 1,
  gifId: 1,
  messageTemplateId: 1,
  sprintId: 1,
  timestamp: "2023-11-07T08:32:15.182Z",
  userId: 1,
  ...overrides,
});

export const congratulatoryMsgFactoryFull = (
  overrides: Partial<Insertable<CongratulatoryMessages>> = {}
): CongratulatoryMessages => ({
  id: expect.any(Number),
  ...congratulatoryMsgFactory(overrides),
});

export const congratulatoryMsgMatcher = (
  overrides: Partial<Insertable<CongratulatoryMessages>> = {}
) => ({
  id: expect.any(Number),
  ...overrides,
  ...congratulatoryMsgFactory(overrides),
});
