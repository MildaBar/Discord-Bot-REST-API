import type { Insertable, Selectable, Updateable } from "kysely";
import { keys } from "./schema";
import type { Sprints, Database } from "@/database";

const TABLE = "sprints";
type Row = Sprints;
type RowWithoutId = Omit<Row, "id">;
type RowInsert = Insertable<RowWithoutId>;
type RowUpdate = Updateable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export default (db: Database) => ({
  findAll(): Promise<RowSelect[]> {
    return db.selectFrom(TABLE).select(keys).execute();
  },

  findById(id: number): Promise<RowSelect | undefined> {
    return db
      .selectFrom(TABLE)
      .select(keys)
      .where("id", "=", id)
      .executeTakeFirst();
  },

  findByCode(code: string): Promise<RowSelect | undefined> {
    return db
      .selectFrom(TABLE)
      .select(keys)
      .where("sprintCode", "=", code)
      .executeTakeFirst();
  },

  create(sprint: RowInsert): Promise<RowSelect | undefined> {
    return db
      .insertInto(TABLE)
      .values(sprint)
      .returning(keys)
      .executeTakeFirst();
  },

  update(id: number, partial: RowUpdate): Promise<RowSelect | undefined> {
    if (Object.keys(partial).length === 0) {
      return this.findById(id);
    }

    return db
      .updateTable(TABLE)
      .set(partial)
      .where("id", "=", id)
      .returning(keys)
      .executeTakeFirst();
  },

  remove(id: number) {
    return db
      .deleteFrom(TABLE)
      .where("id", "=", id)
      .returning(keys)
      .executeTakeFirst();
  },
});
