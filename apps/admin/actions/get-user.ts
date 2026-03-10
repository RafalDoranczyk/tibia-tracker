"use server";

import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { createServerSupabase } from "@/core/supabase/admin";

export async function getUser() {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    throwAndLogError(
      error ?? new Error("Missing redirect URL"),
      AppErrorCode.SERVER_ERROR,
      "Failed to initiate OAuth login"
    );
  }

  return data.user;
}
