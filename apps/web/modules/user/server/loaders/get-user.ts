import { AppErrorCode, throwAndLogError } from "@/core/error";
import { createServerSupabase } from "@/core/supabase/auth/server";
import { assertZodParse } from "@/lib/zod";

import { type AppUser, AppUserSchema } from "../../schemas";
import { dbGetUserRole } from "../queries/user-role";

export async function getUser(): Promise<AppUser> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch user");
  }

  if (!data?.user) {
    throwAndLogError(null, AppErrorCode.UNAUTHORIZED, "User not authenticated");
  }

  const { data: roleData, error: roleError } = await dbGetUserRole(supabase, data.user.id);

  if (roleError) {
    throwAndLogError(roleError, AppErrorCode.SERVER_ERROR, "Failed to fetch user role");
  }

  return assertZodParse(AppUserSchema, {
    id: data.user.id,
    email: data.user.email,
    role: roleData?.role ?? "user",
  });
}
