"use server";

import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { redirect } from "next/navigation";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";

export async function logoutUser(): Promise<void> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await supabase.auth.signOut({ scope: "global" });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to log out");
  }

  redirect("/");
}
