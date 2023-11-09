import { parse } from "../schema";
import {
  congratulatoryMsgFactory,
  congratulatoryMsgFactoryFull,
} from "./utils";
import { omit } from "lodash/fp";

it("parses a valid record", () => {
  const record = congratulatoryMsgFactoryFull();

  expect(parse(record)).toEqual(record);
});

it("throws an error due to empty/missing congratulatory message data", () => {
  const congratulatoryMsg = congratulatoryMsgFactory();

  const congratulatoryMsgWithoutGifId = omit("gifId", congratulatoryMsg);
  const congratulatoryMsgWithoutMessageTemplateId = omit(
    "messageTemplateId",
    congratulatoryMsg
  );
  const congratulatoryMsgWithoutSprintId = omit("sprintId", congratulatoryMsg);
  const congratulatoryMsgWithoutTimestamp = omit(
    "timestamp",
    congratulatoryMsg
  );
  const congratulatoryMsgWithoutUserId = omit("userId", congratulatoryMsg);

  expect(() => parse(congratulatoryMsgWithoutGifId)).toThrow(Error);
  expect(() => parse(congratulatoryMsgWithoutMessageTemplateId)).toThrow(Error);
  expect(() => parse(congratulatoryMsgWithoutSprintId)).toThrow(Error);
  expect(() => parse(congratulatoryMsgWithoutTimestamp)).toThrow(Error);
  expect(() => parse(congratulatoryMsgWithoutUserId)).toThrow(Error);
});
