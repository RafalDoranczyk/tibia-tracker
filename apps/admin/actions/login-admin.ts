"use server";

import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { redirect } from "next/navigation";
import { env } from "@/core/env";
import { createServerSupabase } from "@/core/supabase/admin";

export async function loginAdmin(): Promise<void> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: { redirectTo: env.NEXT_PUBLIC_AUTH_CALLBACK_URL },
  });

  if (error || !data?.url) {
    throwAndLogError(
      error ?? new Error("Missing redirect URL"),
      AppErrorCode.SERVER_ERROR,
      "Failed to initiate OAuth login"
    );
  }

  redirect(data.url);
}
