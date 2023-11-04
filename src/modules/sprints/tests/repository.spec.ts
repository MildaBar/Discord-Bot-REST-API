import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor, selectAllFor } from "@tests/utils/records";
import buildRepository from "../repository";
import { sprintFactory, sprintMatcher } from "./utils";

const db = await createTestDatabase();
const repository = buildRepository(db);
const createSprintsData = createFor(db, "sprints");
const selectSprintsData = selectAllFor(db, "sprints");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("sprints").execute();
});

describe("findById", () => {
  it("should return a sprint data by id", async () => {
    const [sprint] = await createSprintsData(
      sprintFactory({
        id: 1,
      })
    );

    const foundSprint = await repository.findById(sprint!.id);

    expect(foundSprint).toEqual(sprintMatcher());
  });
});

describe("create", () => {
  it("should create a new sprint data", async () => {
    const sprint = await repository.create({
      sprintCode: "WD-3.1",
      sprintTitle: "Node.js and Relational Databases",
    });

    expect(sprint).toEqual({
      id: expect.any(Number),
      sprintCode: "WD-3.1",
      sprintTitle: "Node.js and Relational Databases",
    });

    const sprintInDatabase = await selectSprintsData();
    expect(sprintInDatabase).toEqual([sprint]);
  });
});

describe("update", () => {
  it("should update the sprint data", async () => {
    const [sprint] = await createSprintsData(sprintFactory());

    const updateSprintsData = await repository.update(sprint.id, {});

    expect(updateSprintsData).toMatchObject(
      sprintMatcher({
        sprintCode: "WD-3.1",
        sprintTitle: "Node.js and Relational Databases",
      })
    );
  });
});

describe("remove", () => {
  it("should remove a sprint", async () => {
    const [sprint] = await createSprintsData(sprintFactory());

    const removeSprint = await repository.remove(sprint.id);

    expect(removeSprint).toEqual(sprintMatcher());
  });
});
