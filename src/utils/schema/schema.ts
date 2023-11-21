import { ZodRawShape, z, ZodType } from "zod";

type Schema<T extends ZodRawShape> = z.ZodObject<T>;

// Create a function to omit the 'id' field from the schema
const omitId = <T extends ZodRawShape>(
  schema: Schema<T>
): Schema<Omit<T, "id">> => {
  const { id, ...rest } = schema.shape;
  return z.object(rest) as Schema<Omit<T, "id">>;
};

// Create a function to get the partial schema
const getPartial = <T extends ZodRawShape>(
  schema: Schema<T>
): ZodType<Partial<T>> => {
  return z.object(schema.shape).partial();
};

export const parse = <T extends ZodRawShape>(
  schema: Schema<T>,
  data: unknown
): T => schema.parse(data) as any as T;

export const parseInsertable = <T extends ZodRawShape>(
  schema: Schema<T>,
  data: unknown
): T => omitId(schema).parse(data) as any as T;

export const parseUpdateable = <T extends ZodRawShape>(
  schema: Schema<T>,
  data: unknown
): T => getPartial(omitId(schema)).parse(data) as any as T;

export const parseId = <T extends ZodRawShape>(
  schema: Schema<T>,
  data: unknown
): number => schema.shape.id.parse(data);

export const keys = <T extends ZodRawShape>(schema: Schema<T>): (keyof T)[] =>
  Object.keys(schema.shape) as (keyof T)[];
