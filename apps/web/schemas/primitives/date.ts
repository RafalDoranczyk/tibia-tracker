import { z } from "zod";

import { validationMessages } from "../validation/messages";

export const CreatedAt = z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
  message: validationMessages.date.invalid("Created at"),
});

export const ISODateToYYYYMMDD = z.string().transform((value) => value.slice(0, 10));
