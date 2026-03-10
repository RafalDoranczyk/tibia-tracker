"use server";

import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/core/supabase";

export async function logoutAdmin(): Promise<void> {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signOut({ scope: "global" });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to log out");
  }

  redirect("/");
}
