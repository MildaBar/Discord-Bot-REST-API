"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateToLatest = void 0;
require("dotenv/config");
const kysely_1 = require("kysely");
async function migrateToLatest(provider, db) {
    const migrator = new kysely_1.Migrator({ db, provider });
    return migrator.migrateToLatest();
}
exports.migrateToLatest = migrateToLatest;
/*
-- migrateToLatest - handles the execution of database migrations
- provider -  responsible for managing the migrations, including fetching the migration files and applying them to the database. It controls the process of updating the database schema based on the defined migrations
- db: Kysely<any> - specify the type of the database instance that the migratiohn will be applied to
*/
