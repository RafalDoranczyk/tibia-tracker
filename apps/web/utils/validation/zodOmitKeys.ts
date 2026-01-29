import type { z } from "zod";

export function zodOmitKeys<T extends z.ZodObject<z.ZodRawShape>>(schema: T) {
  return Object.fromEntries(Object.keys(schema.shape).map((k) => [k, true])) as {
    [K in keyof z.infer<T>]?: true;
  };
}
