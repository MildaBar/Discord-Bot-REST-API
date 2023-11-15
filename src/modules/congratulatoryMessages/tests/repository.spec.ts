import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor, selectAllFor } from "@tests/utils/records";
import buildRepository from "../repository";
import { repositoryTestSetup } from "./repositoryTestSetup";
import { congratulatoryMsgFactory } from "./utils";

const db = await createTestDatabase();
const repository = buildRepository(db);
const createCongratulatoryMsgRecords = createFor(db, "congratulatoryMessages");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("users").execute();
  await db.deleteFrom("gifs").execute();
  await db.deleteFrom("messageTemplates").execute();
  await db.deleteFrom("sprints").execute();
  await db.deleteFrom("congratulatoryMessages").execute();
});

describe("findAll", () => {
  it("should return all congratulatory messages data", async () => {
    await repositoryTestSetup(db);

    await createCongratulatoryMsgRecords([
      congratulatoryMsgFactory({
        id: 1,
        gifId: 1,
        messageTemplateId: 1,
        sprintId: 1,
        timestamp: "2023-11-07T08:32:15.182Z",
        userId: 1,
      }),
    ]);

    const foundCongratulatoryMsgData = await repository.findAll();

    expect(foundCongratulatoryMsgData).toEqual([
      {
        id: 1,
        gifId: 1,
        messageTemplateId: 1,
        sprintId: 1,
        timestamp: "2023-11-07T08:32:15.182Z",
        userId: 1,
      },
    ]);
  });
});

// describe("finduserId", () => {
//   it("should return congratulatory message data based on users ID", async () => {
//     // await repositoryTestSetup(db);

//     await createCongratulatoryMsgRecords([
//       congratulatoryMsgFactory({
//         id: 100,
//         gifId: 100, // Use a unique ID here
//         messageTemplateId: 100, // Use a unique ID here
//         sprintId: 100, // Use a unique ID here
//         timestamp: "2023-11-07T08:32:15.182Z",
//         userId: 100, // Use a unique ID here
//       }),
//       congratulatoryMsgFactory({
//         id: 200,
//         gifId: 200, // Use a unique ID here
//         messageTemplateId: 200, // Use a unique ID here
//         sprintId: 200, // Use a unique ID here
//         timestamp: "2023-11-08T08:32:15.182Z",
//         userId: 200, // Use a unique ID here
//       }),
//     ]);

//     const foundCongratulatoryMsgData = await repository.finduserId(100);

//     expect(foundCongratulatoryMsgData).toEqual({
//       id: 100,
//       gifId: 100, // Use a unique ID here
//       messageTemplateId: 100, // Use a unique ID here
//       sprintId: 100, // Use a unique ID here
//       timestamp: "2023-11-07T08:32:15.182Z",
//       userId: 100, // Use a unique ID here
//     });
//   });
// });

// describe("create", () => {
//   it("should crate congratulatoryMessages data", async () => {
//     const congratulatoryMessagesData = await repository.create({
//       gifId: 1,
//       messageTemplateId: 1,
//       sprintId: 1,
//       timestamp: "2023-11-07T08:32:15.182Z",
//       userId: 1,
//     });

//     expect(congratulatoryMessagesData).toBeDefined();

//     if (congratulatoryMessagesData) {
//       expect(congratulatoryMessagesData).toEqual({
//         id: expect.any(Number),
//         gifId: 1,
//         messageTemplateId: 1,
//         sprintId: 1,
//         timestamp: "2023-11-07T08:32:15.182Z",
//         userId: 1,
//       });
//     } else {
//       throw new Error("congratulatoryMessagesData is undefined.");
//     }

//     expect(dataInDatabase).toEqual([congratulatoryMessagesData]);
//   });
// });
