import { AppError } from "./AppError";
import type { AppErrorCode } from "./AppErrorCode";
import { logServerError } from "./logServerError";

export function wrapAndLogError(error: unknown, code: AppErrorCode, message?: string): AppError {
  const appError =
    error instanceof AppError ? error : new AppError(code, message, { cause: error });

  logServerError(appError);
  return appError;
}
