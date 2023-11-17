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

describe("PATCH", () => {
  it("persists changes", async () => {
    const id = 1;
    await createSprintsRecords([sprintFactory({ id })]);

    const patchResponse = await supertest(app)
      .patch("/sprints")
      .send({
        id,
        sprintCode: "WD-3.1",
        sprintTitle: "Node.js and Relational Databases - Module 3 project.",
      })
      .expect(200);

    const { body } = await supertest(app)
      .get("/sprints")
      .send({ id })
      .expect(200);

    expect(body[0]).toEqual(
      sprintMatcher({
        id,
        sprintCode: "WD-3.1",
        sprintTitle: "Node.js and Relational Databases - Module 3 project.",
      })
    );
  });
});
