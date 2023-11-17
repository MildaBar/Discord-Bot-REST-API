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

describe("POST", () => {
  it("should return 201 and create new sprint data", async () => {
    const { body } = await supertest(app)
      .post("/sprints")
      .send(sprintFactory())
      .expect(201);

    expect(body).toEqual(sprintMatcher());
  });

  it("does not allow to create an article with empty sprintCode", async () => {
    const { body } = await supertest(app)
      .post("/sprints")
      .send(sprintFactory({ sprintCode: "" }))
      .expect(400);

    expect(body.error.message);
  });
});
