export const ValidationErrors = {
  COMMON: {
    REQUIRED: "common.required",
  },

  STRING: {
    MIN: "string.min",
    MAX: "string.max",
  },

  NUMBER: {
    POSITIVE: "number.positive",
    INT: "number.int",
    NON_NEGATIVE: "number.non_negative",
  },

  DATE: {
    INVALID: "date.invalid",
  },

  UUID: {
    INVALID: "uuid.invalid",
  },
} as const;
