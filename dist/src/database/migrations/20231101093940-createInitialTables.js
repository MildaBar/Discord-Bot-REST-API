"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = void 0;
async function up(db) {
    await db.schema
        .createTable("users")
        .ifNotExists()
        .addColumn("id", "integer", (c) => c.primaryKey().autoIncrement().notNull())
        .addColumn("username", "text", (c) => c.notNull())
        .execute();
    await db.schema
        .createTable("gifs")
        .ifNotExists()
        .addColumn("id", "integer", (c) => c.primaryKey().autoIncrement().notNull())
        .addColumn("gif_url", "text", (c) => c.notNull())
        .execute();
    await db.schema
        .createTable("message_templates")
        .ifNotExists()
        .addColumn("id", "integer", (c) => c.primaryKey().autoIncrement().notNull())
        .addColumn("template", "text", (c) => c.notNull())
        .execute();
    await db.schema
        .createTable("congratulatory_messages")
        .ifNotExists()
        .addColumn("id", "integer", (c) => c.primaryKey().autoIncrement().notNull())
        .addColumn("user_id", "integer", (c) => c.references("users.id").onDelete("cascade").notNull())
        .addColumn("sprint_id", "integer", (c) => c.references("sprints.id").onDelete("cascade").notNull())
        .addColumn("message_template_id", "integer", (c) => c.references("message_templates.id").onDelete("cascade").notNull())
        .addColumn("gif_id", "integer", (c) => c.references("gifs.id").onDelete("cascade").notNull())
        .addColumn("timestamp", "datetime", (c) => c.notNull())
        .execute();
    await db.schema
        .createTable("sprints")
        .ifNotExists()
        .addColumn("id", "integer", (c) => c.primaryKey().autoIncrement().notNull())
        .addColumn("sprint_title", "text", (c) => c.notNull())
        .execute();
}
exports.up = up;
