import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface CongratulatoryMessages {
  gifId: number;
  id: Generated<number>;
  messageTemplateId: number;
  sprintId: number;
  timestamp: string;
  userId: number;
}

export interface Gifs {
  gifUrl: string;
  id: Generated<number>;
}

export interface MessageTemplates {
  id: Generated<number>;
  template: string;
}

export interface Sprints {
  id: Generated<number>;
  sprintTitle: string;
}

export interface Users {
  id: Generated<number>;
  username: string;
}

export interface DB {
  congratulatoryMessages: CongratulatoryMessages;
  gifs: Gifs;
  messageTemplates: MessageTemplates;
  sprints: Sprints;
  users: Users;
}
