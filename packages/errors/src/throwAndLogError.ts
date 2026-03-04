import { AppError } from "./AppError";
import type { AppErrorCode } from "./AppErrorCode";
import { logServerError } from "./logServerError";

export function throwAndLogError(error: unknown, code: AppErrorCode, message?: string): never {
  const appError =
    error instanceof AppError ? error : new AppError(code, message, { cause: error });

  logServerError(appError);
  throw appError;
}
