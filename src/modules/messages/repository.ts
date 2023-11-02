import type {
  ExpressionOrFactory,
  Insertable,
  Selectable,
  SqlBool,
  Updateable,
} from "kysely";
import { keys } from "./schema";
import type { MessageTemplates, Databse, DB } from "@/databse";

const TABLE = "message_templates";
type TableName = typeof TABLE;
type Row = MessageTemplates;
type RowSelect = Selectable<Row>;

export default (db: Database) => ({
  findAll(): Promise<RowSelect[]> {
    return db.selectFrom(TABLE).select(keys).execute();
  },
});
