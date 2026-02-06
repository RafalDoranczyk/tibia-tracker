import { AppErrorCode } from "@/core/error";

export function mapAppErrorCodeToHttpStatus(code: AppErrorCode): number {
  switch (code) {
    case AppErrorCode.UNAUTHORIZED:
      return 401;

    case AppErrorCode.PERMISSION_DENIED:
      return 403;

    case AppErrorCode.NOT_FOUND:
      return 404;

    case AppErrorCode.VALIDATION_ERROR:
    case AppErrorCode.INVALID_PAYLOAD:
    case AppErrorCode.INVALID_QUERY_PARAMS:
      return 400;

    case AppErrorCode.UNIQUE_VIOLATION:
      return 409;

    case AppErrorCode.FOREIGN_KEY_VIOLATION:
      return 409;

    default:
      return 500;
  }
}
