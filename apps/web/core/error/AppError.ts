import { AppErrorCode } from "./AppErrorCode";

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly cause?: unknown;
  public readonly details?: unknown;

  constructor(
    code: AppErrorCode,
    message?: string,
    options?: {
      cause?: unknown;
      details?: unknown;
    }
  ) {
    const finalMessage = message ?? AppError.getDefaultMessage(code);
    super(finalMessage);

    this.name = "AppError";
    this.code = code;
    this.cause = options?.cause;
    this.details = options?.details;
  }

  private static getDefaultMessage(code: AppErrorCode): string {
    switch (code) {
      case AppErrorCode.FOREIGN_KEY_VIOLATION:
        return "Invalid foreign key reference.";
      case AppErrorCode.UNIQUE_VIOLATION:
        return "Unique constraint violation.";
      case AppErrorCode.INVALID_PAYLOAD:
        return "The provided data is invalid.";
      case AppErrorCode.INVALID_QUERY_PARAMS:
        return "Invalid query parameters provided.";
      case AppErrorCode.NOT_FOUND:
        return "Requested resource not found.";
      case AppErrorCode.PERMISSION_DENIED:
        return "You do not have permission to perform this action.";
      case AppErrorCode.SERVER_ERROR:
        return "An unexpected server error occurred.";
      case AppErrorCode.UNAUTHORIZED:
        return "User is not authorized.";
      default:
        return "An unknown error occurred.";
    }
  }
}
