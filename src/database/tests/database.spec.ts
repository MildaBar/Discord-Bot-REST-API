import createTestDatabase from "@tests/utils/createTestDatabase";
import { Database } from "@/database";

const db: Database = await createTestDatabase();

describe("Database", () => {
  it("should have the screenings table", async () => {
    let tableExists = false;

    try {
      await db.selectFrom("screenings").selectAll().execute();
      tableExists = true;
    } catch (error) {
      tableExists = false;
    }

    expect(tableExists).toBe(true);
  });
});
