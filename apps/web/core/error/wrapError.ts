import { AppError } from "./AppError";
import type { AppErrorCode } from "./AppErrorCode";

export function wrapError(error: unknown, code: AppErrorCode, message?: string): AppError {
  if (error instanceof AppError) {
    return error;
  }

  return new AppError(code, message, {
    cause: error,
  });
}
