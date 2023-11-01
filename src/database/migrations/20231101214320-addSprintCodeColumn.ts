import { Kysely, SqliteDatabase } from "kysely";

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .alterTable("sprints")
    .addColumn("sprint_code", "text", (c) => c.notNull())
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.alterTable("sprints").dropColumn("sprint_code").execute();
}
