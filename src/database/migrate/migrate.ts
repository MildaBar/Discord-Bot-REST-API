import "dotenv/config";
import * as path from "path";
import * as fs from "fs/promises";
import SQLite, { type Database } from "better-sqlite3";
import { FileMigrationProvider, Kysely, SqliteDialect } from "kysely";
import { migrateToLatest } from ".";

// path to the migration files
const MIGRATIONS_PATH = "../migrations";

// initialize the database using SQLite dialect and the specified url
async function migrateDefault(url: string) {
  // create a new database instance using Kysely
  // initialize the database conncetion
  const db = new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new SQLite(url),
    }),
  });

  // indicate the beginning of the migrations process
  console.log(1);

  // handle the migration files stored in the specified path
  // FileMigrationProvider is an object representing the migration provider used for handling migration files
  const nodeProvider = new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, MIGRATIONS_PATH),
  });

  const { results, error } = await migrateToLatest(nodeProvider, db);

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed SUCCESSFULLY`);
    } else if (it.status === "Error") {
      console.error(`FAILED to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  // close database conncetion
  await db.destroy();
}

if (require.main === module) {
  const { DATABASE_URL } = process.env;

  if (typeof DATABASE_URL !== "string") {
    throw new Error("Provide DATABASE_URL in your environment variables.");
  }

  migrateDefault(DATABASE_URL);
}

/*
-- file contains the logic for executing migrations
-- migrateDefault function - servers as the entry point for executing the database migrations
- it initializes the database, sets up the migration provider and calls the migrateToLatest function to handle the migration process
-- "?" - allows to safely access forEach method of the results even if it is null or undefined
*/
