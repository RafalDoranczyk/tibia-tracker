import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type AppUser, AppUserSchema } from "../../schemas";
import { dbGetUserRole } from "../queries/user-role";

export async function getUser(): Promise<AppUser> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  if (!user) {
    throwAndLogError(null, AppErrorCode.UNAUTHORIZED, "User not authenticated");
  }

  const { data: roleData, error: roleError } = await dbGetUserRole(supabase, user.id);

  if (roleError) {
    throwAndLogError(roleError, AppErrorCode.SERVER_ERROR, "Failed to fetch user role");
  }

  return assertZodParse(AppUserSchema, {
    id: user.id,
    email: user.email,
    role: roleData?.role ?? "user",
  });
}
