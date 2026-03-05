import { type AppUser, AppUserSchema, UserRepo } from "@repo/database/user";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";

export async function getAppUser(): Promise<AppUser> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  if (!user) {
    throwAndLogError(null, AppErrorCode.UNAUTHORIZED, "User not authenticated");
  }

  const { data, error } = await UserRepo.getRole(supabase, user.id);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch user role");
  }

  return assertZodParse(AppUserSchema, {
    id: user.id,
    email: user.email,
    role: data?.role ?? "user",
  });
}
