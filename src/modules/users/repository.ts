import type { Insertable, Selectable, Updateable } from "kysely";
import { keys } from "./schema";
import type { Users, Database } from "@/database";

const TABLE = "users";
type Row = Users;
type RowWithoutId = Omit<Row, "id">;
type RowInsert = Insertable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export default (db: Database, username: string) => ({
  findAll(): Promise<RowSelect[]> {
    return db.selectFrom(TABLE).select(keys).execute();
  },

  findUser(username: string): Promise<RowSelect | undefined> {
    return db
      .selectFrom(TABLE)
      .select(keys)
      .where("username", "=", username)
      .executeTakeFirst();
  },

  create(username: RowInsert): Promise<RowSelect | undefined> {
    return db
      .insertInto(TABLE)
      .values(username)
      .returning(keys)
      .executeTakeFirst();
  },
});
