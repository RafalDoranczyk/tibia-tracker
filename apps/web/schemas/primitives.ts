import { z } from "zod";

import { ValidationErrors } from "./errors";

/**
 * Strings
 */

export const NonEmptyString = z.string().trim().min(1, {
  message: ValidationErrors.COMMON.REQUIRED,
});

export const UUID = z.string().uuid({
  message: ValidationErrors.UUID.INVALID,
});

/**
 * Dates
 */

export const ISODate = z.string().datetime({
  message: ValidationErrors.DATE.INVALID,
});

/**
 * Numbers
 */

export const PositiveInt = z
  .number()
  .int({
    message: ValidationErrors.NUMBER.INT,
  })
  .positive({
    message: ValidationErrors.NUMBER.POSITIVE,
  });

export const NonNegativeInt = z
  .number()
  .int({
    message: ValidationErrors.NUMBER.INT,
  })
  .min(0, {
    message: ValidationErrors.NUMBER.NON_NEGATIVE,
  });

export const Email = z.string().email();
export const OptionalString = z.string().trim().optional();
export const NullableString = z.string().trim().nullable();
