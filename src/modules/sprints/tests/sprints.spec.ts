import supertest from "supertest";
import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { sprintFactory, sprintMatcher } from "./utils";
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

describe("DELETE", () => {
  it("should delete sprints data based on sprints id", async () => {
    const id = 1;
    await supertest(app).delete("/sprints").send({ id }).expect(200);
  });
});
