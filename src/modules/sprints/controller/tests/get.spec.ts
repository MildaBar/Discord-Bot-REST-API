import supertest from "supertest";
import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { sprintFactory, sprintMatcher } from "../../tests/utils";
import createApp from "@/app";

//  initializes a test database
const db = await createTestDatabase();
// creates an application instance
const app = createApp(db);

const createSprintsRecords = createFor(db, "sprints");

afterEach(async () => {
  await db.deleteFrom("sprints").execute();
});

afterAll(() => db.destroy());

describe("GET", () => {
  it("should return a list of all existing sprint data", async () => {
    await createSprintsRecords([
      sprintFactory(),
      sprintFactory({
        sprintCode: "WD-3.1",
        sprintTitle: "Node.js and Relational Databases",
      }),
    ]);

    const { body } = await supertest(app).get("/sprints").expect(200);

    expect(body).toEqual([
      sprintMatcher(),
      sprintMatcher({
        sprintCode: "WD-3.1",
        sprintTitle: "Node.js and Relational Databases",
      }),
    ]);
  });

  it("should return an empty array when there are no sprint data", async () => {
    const { body } = await supertest(app).get("/sprints").expect(200);

    expect(body).toEqual([]);
  });

  it("should return a sprint data if it exists", async () => {
    await createSprintsRecords([
      sprintFactory({
        id: 1,
      }),
    ]);

    const { body } = await supertest(app).get("/sprints").expect(200);

    expect(body).toEqual([
      sprintMatcher({
        id: 1,
      }),
    ]);
  });
});
