import { type AppUser, AppUserSchema, dbGetUserRole } from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";

export async function getUser(): Promise<AppUser> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  if (!user) {
    throwAndLogError(null, AppErrorCode.UNAUTHORIZED, "User not authenticated");
  }

  const { data: roleData, error: roleError } = await dbGetUserRole({ supabase, userId: user.id });

  if (roleError) {
    throwAndLogError(roleError, AppErrorCode.SERVER_ERROR, "Failed to fetch user role");
  }

  return assertZodParse(AppUserSchema, {
    id: user.id,
    email: user.email,
    role: roleData?.role ?? "user",
  });
}
