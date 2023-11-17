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

describe("DELETE", () => {
  it("should delete sprints data based on sprints id", async () => {
    const id = 1;
    await supertest(app).delete("/sprints").send({ id }).expect(200);
  });
});
