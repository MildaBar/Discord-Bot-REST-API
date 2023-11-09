import { parse } from "../schema";
import { messageFactoryFull } from "./utils";

it("parses a valid record", () => {
  const record = messageFactoryFull();

  expect(parse(record)).toEqual(record);
});

it("throws an error due to empty/missing message template", () => {
  const messageWithoutTemplate = {
    id: 1,
    template: "",
  };

  expect(() => parse(messageWithoutTemplate)).toThrow(/template/i);
});

it("throws an error due to empty/missing message id", () => {
  const messageWithoutId = {
    id: "",
    template: "Impressive work! Well done!👏",
  };

  expect(() => parse(messageWithoutId)).toThrow(/id/i);
});
