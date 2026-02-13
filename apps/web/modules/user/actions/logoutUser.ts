"use server";

import { redirect } from "next/navigation";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";

export async function logoutUser() {
  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await supabase.auth.signOut({ scope: "global" });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to log out");
  }

  redirect("/");
}
