import { AppError, AppErrorCode } from "@repo/errors";
import { type ZodError, type ZodType, z } from "zod";

function mapZodErrorToAppError(error: ZodError): AppError {
  const formattedErrors = error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "root";

    let message = `• ${path}: ${issue.message}`;

    if ("received" in issue && issue.received !== undefined) {
      try {
        message += ` (received: ${JSON.stringify(issue.received)})`;
      } catch {
        message += " (received: [Complex Value])";
      }
    }

    if ("expected" in issue && issue.expected !== undefined) {
      message += ` (expected: ${issue.expected})`;
    }

    if (issue.code) {
      message += ` [${issue.code}]`;
    }

    return message;
  });

  const message =
    formattedErrors.length > 0
      ? `Validation failed:\n${formattedErrors.join("\n")}`
      : "Invalid data format";

  return new AppError(AppErrorCode.VALIDATION_ERROR, message, {
    details: z.treeifyError(error),
  });
}

/**
 * Validates the provided data using the given Zod schema.
 *
 * @template T - The expected return type after parsing.
 * @param schema - The Zod schema to use for validation.
 * @param data - The unknown input data to validate and parse.
 * @returns The validated and parsed data as type T.
 * @throws AppError if validation fails (with code VALIDATION_ERROR).
 */
// 4. Zmiana: ZodTypeAny -> ZodType
export function assertZodParse<T extends ZodType>(schema: T, data: unknown): z.output<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Zod validation failed:", {
        inputData: data,
        formatted: z.treeifyError(result.error),
      });
    } else {
      // 5. Zmiana: result.error.errors -> result.error.issues
      console.error("Zod validation failed:", result.error.issues);
    }

    throw mapZodErrorToAppError(result.error);
  }

  return result.data;
}
