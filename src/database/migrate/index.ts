import "dotenv/config";
import { type Kysely, type MigrationProvider, Migrator } from "kysely";

export async function migrateToLatest(
  provider: MigrationProvider,
  db: Kysely<any>
) {
  const migrator = new Migrator({ db, provider });

  return migrator.migrateToLatest();
}

/*
-- migrateToLatest - handles the execution of database migrations
- provider -  responsible for managing the migrations, including fetching the migration files and applying them to the database. It controls the process of updating the database schema based on the defined migrations
- db: Kysely<any> - specify the type of the database instance that the migratiohn will be applied to
*/
