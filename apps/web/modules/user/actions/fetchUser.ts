"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { createServerSupabase } from "@/core/supabase";

import type { AppUser } from "../schemas/user.schema";

export async function fetchUser(): Promise<AppUser> {
  const supabase = await createServerSupabase();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch user");
  }

  if (!user) {
    throw wrapAndLogError(null, AppErrorCode.UNAUTHORIZED, "User not authenticated");
  }

  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (roleError) {
    throw wrapAndLogError(roleError, AppErrorCode.SERVER_ERROR, "Failed to fetch user role");
  }

  return {
    id: user.id,
    email: user.email,
    role: roleData?.role ?? "user",
  };
}
