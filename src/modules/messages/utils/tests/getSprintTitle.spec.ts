import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { sprintFactory } from "../../../sprints/tests/utils";
import getSprintTitle from "../getSprintTitle";

const db = await createTestDatabase();
const createSprintRecord = createFor(db, "sprints");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("sprints").execute();
});

describe("getSprintTitle", () => {
  it("should return sprint title based on sprintCode", async () => {
    await createSprintRecord([
      sprintFactory({
        sprintCode: "WD-3.1",
        sprintTitle: "Node.js and Relational Databases",
      }),
    ]);

    const sprintCode = "WD-3.1";
    const sprintTitle = await getSprintTitle(sprintCode, db);

    expect(sprintTitle?.sprintTitle).toEqual(
      "Node.js and Relational Databases"
    );
  });
});
