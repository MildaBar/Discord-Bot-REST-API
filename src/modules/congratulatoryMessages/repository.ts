import type { Insertable, Selectable } from "kysely";
import { keys } from "./schema";
import type { CongratulatoryMessages, Database } from "@/database";

const TABLE = "congratulatoryMessages";

type Row = CongratulatoryMessages;
type RowWithoutId = Omit<Row, "id">;
type RowInsert = Insertable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export default (db: Database) => ({
  findAll(): Promise<RowSelect[]> {
    return db.selectFrom(TABLE).select(keys).execute();
  },

  finduserId(userId: number): Promise<RowSelect[]> {
    return db
      .selectFrom(TABLE)
      .where("congratulatoryMessages.userId", "=", userId)
      .select(keys)
      .execute();
  },

  findMsgTemplate(sprintId: number): Promise<RowSelect[]> {
    return db
      .selectFrom(TABLE)
      .where("sprintId", "=", sprintId)
      .select(keys)
      .execute();
  },

  create: async (data: RowInsert): Promise<RowSelect | undefined> => {
    const { gifId, messageTemplateId, sprintId, timestamp, userId } = data;

    try {
      const result = await db
        .insertInto(TABLE)
        .values({ gifId, messageTemplateId, sprintId, timestamp, userId })
        .returning(keys)
        .executeTakeFirst();

      return result;
    } catch (error) {
      console.error(
        "An error occurred while creating congratulatory message:",
        error
      );
      return undefined;
    }
  },
});
