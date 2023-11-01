"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const kysely_1 = require("kysely");
const _1 = require(".");
// path to the migration file
const MIGRATIONS_PATH = "../migrations";
// initialize the database using SQLite dialect and the specified url
async function migrateDefault(url) {
    // create a new database instance using Kysely
    // initialize the database conncetion
    const db = new kysely_1.Kysely({
        dialect: new kysely_1.SqliteDialect({
            database: new better_sqlite3_1.default(url),
        }),
    });
    // indicate the beginning of the migrations process
    console.log(1);
    // handle the migration files stored in the specified path
    // FileMigrationProvider is an object representing the migration provider used for handling migration files
    const nodeProvider = new kysely_1.FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, MIGRATIONS_PATH),
    });
    const { results, error } = await (0, _1.migrateToLatest)(nodeProvider, db);
    results === null || results === void 0 ? void 0 : results.forEach((it) => {
        if (it.status === "Success") {
            console.log(`migration "${it.migrationName}" was executed SUCCESSFULLY`);
        }
        else if (it.status === "Error") {
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
