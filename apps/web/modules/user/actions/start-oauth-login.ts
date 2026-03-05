"use server";

import { OAuthProviderSchema } from "@repo/database/user";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { redirect } from "next/navigation";
import { env } from "@/core/env";
import { createServerSupabase } from "@/core/supabase/server";

export async function startOAuthLogin(payload: unknown): Promise<void> {
  const provider = assertZodParse(OAuthProviderSchema, payload);

  const supabase = await createServerSupabase();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
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
