import { AppError, AppErrorCode } from "@/core/error";
import { createSupabaseErrorMapper } from "@/lib/supabase";

export const mapSupabaseErrorToAppError = createSupabaseErrorMapper((error) => {
  if (error.code) {
    switch (error.code) {
      case "23505":
        return new AppError(AppErrorCode.UNIQUE_VIOLATION);
      case "23503":
        return new AppError(AppErrorCode.FOREIGN_KEY_VIOLATION);
    }
  }

  if (error.status) {
    switch (error.status) {
      case 401:
        return new AppError(AppErrorCode.UNAUTHORIZED);
      case 403:
        return new AppError(AppErrorCode.PERMISSION_DENIED);
    }
  }

  return new AppError(AppErrorCode.SERVER_ERROR);
});
