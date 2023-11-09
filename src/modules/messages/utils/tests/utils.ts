import type {
  MessageTemplates,
  Users,
  CongratulatoryMessages,
} from "@/database";
import type { Insertable } from "kysely";

export const messageFactory = (
  overrides: Partial<Insertable<MessageTemplates>> = {}
): Insertable<MessageTemplates> => ({
  id: 1,
  template: "Impressive work! Well done!👏",
  ...overrides,
});

export const usersFactory = (
  overrides: Partial<Insertable<Users>> = {}
): Insertable<Users> => ({
  id: 1,
  username: "JohnJoe",
});

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
