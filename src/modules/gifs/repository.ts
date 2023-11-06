import type { Insertable, Selectable, Updateable } from "kysely";
import { keys } from "./schema";
import type { Gifs, Database, DB } from "@/database";

const TABLE = "gifs";
type Row = Gifs;
type RowWithoutId = Omit<Row, "id">;
type RowInsert = Insertable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export default (db: Database, _gifUrl: string) => ({
  findAll(): Promise<RowSelect[]> {
    return db.selectFrom(TABLE).select(keys).execute();
  },

  findUrl(gifUrl: string): Promise<RowSelect | undefined> {
    return db
      .selectFrom(TABLE)
      .select(keys)
      .where("gifUrl", "=", gifUrl)
      .executeTakeFirst();
  },

  create(gifUrl: RowInsert): Promise<RowSelect | undefined> {
    return db
      .insertInto(TABLE)
      .values(gifUrl)
      .returning(keys)
      .executeTakeFirst();
  },
});
