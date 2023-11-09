import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { sprintFactory } from "../../../sprints/tests/utils";
import getSprintsId from "../getSprintsId";

const db = await createTestDatabase();
const createSprintsRecords = createFor(db, "sprints");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("sprints").execute();
});

describe("getSprintsId", () => {
  it("should return sprints ID based on sprints code", async () => {
    await createSprintsRecords([
      sprintFactory({
        sprintCode: "WD-3.1",
        sprintTitle: "Node.js and Relational Databases",
      }),
    ]);

    const sprintCode = "WD-3.1";
    const sprintId = await getSprintsId(db, sprintCode);

    expect(sprintId).toEqual(1);
  });
});
