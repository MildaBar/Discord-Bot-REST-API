import type { ExpressionOrFactory, Insertable, Kysely, SqlBool } from "kysely";
import { DB } from "@/database";

type HelperType<N extends keyof DB> = { [P in N]: DB[P] };

/**
 * Given a database instance and a table name, returns a function
 * that inserts records into that table.
 * @param db Kysely database instance
 * @param tableName Name of the table
 */
export const createFor = <N extends keyof DB, T extends HelperType<N>>(
  db: Kysely<T>,
  tableName: N
): ((records: Insertable<DB[N]> | Insertable<DB[N]>[]) => Promise<any>) => {
  return (records: Insertable<DB[N]> | Insertable<DB[N]>[]) =>
    db
      .insertInto(tableName)
      .values(records as any)
      .returningAll()
      .execute();
};

/**
 * Given a database instance and a table name, returns a function
 * that selects all records from that table.
 * @param db Kysely database instance
 * @param tableName Name of the table
 */
export const selectAllFor = <N extends keyof DB, T extends HelperType<N>>(
  db: Kysely<T>,
  tableName: N
): ((
  expression?: ExpressionOrFactory<DB, N, SqlBool> | undefined
) => Promise<any>) => {
  return (expression?: ExpressionOrFactory<DB, N, SqlBool>) => {
    const query = db.selectFrom(tableName).selectAll();

    return expression
      ? query.where(expression as any).execute() // shortcut which works as long as there are no table aliases
      : query.execute();
  };
};
