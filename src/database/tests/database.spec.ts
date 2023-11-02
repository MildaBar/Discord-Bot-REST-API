import createTestDatabase from "../../../tests/utils/createTestDatabase";
import { Database } from "../../database";
import { it, describe, expect } from "vitest";

describe("Database", () => {
  it("should have the congratulatoryMessages table", async () => {
    const db: Database = await createTestDatabase();

    let tableExists = false;

    try {
      await db.selectFrom("congratulatoryMessages").selectAll().execute();
      tableExists = true;
    } catch (error) {
      tableExists = false;
    }

    expect(tableExists).toBe(true);
  });

  it("should have the gifs table", async () => {
    const db: Database = await createTestDatabase();

    let tableExists = false;

    try {
      await db.selectFrom("gifs").selectAll().execute();
      tableExists = true;
    } catch (error) {
      tableExists = false;
    }

    expect(tableExists).toBe(true);
  });

  it("should have the sprints table", async () => {
    const db: Database = await createTestDatabase();

    let tableExists = false;

    try {
      await db.selectFrom("sprints").selectAll().execute();
      tableExists = true;
    } catch (error) {
      tableExists = false;
    }

    expect(tableExists).toBe(true);
  });

  it("should have the users table", async () => {
    const db: Database = await createTestDatabase();

    let tableExists = false;

    try {
      await db.selectFrom("users").selectAll().execute();
      tableExists = true;
    } catch (error) {
      tableExists = false;
    }

    expect(tableExists).toBe(true);
  });

  it("should have the messageTemplates table", async () => {
    const db: Database = await createTestDatabase();

    let tableExists = false;

    try {
      await db.selectFrom("messageTemplates").selectAll().execute();
      tableExists = true;
    } catch (error) {
      tableExists = false;
    }

    expect(tableExists).toBe(true);
  });
});
