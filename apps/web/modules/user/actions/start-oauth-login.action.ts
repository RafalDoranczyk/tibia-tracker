"use server";

import { redirect } from "next/navigation";

import { env } from "@/core/env";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { createServerSupabase, mapSupabaseErrorToAppError } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { OAuthProviderSchema } from "../schemas";

export async function startOAuthLogin(payload: unknown): Promise<void> {
  const provider = assertZodParse(OAuthProviderSchema, payload);

  const supabase = await createServerSupabase();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: env.NEXT_PUBLIC_AUTH_CALLBACK_URL },
  });

  if (error) {
    throwAndLogError(
      mapSupabaseErrorToAppError(error),
      AppErrorCode.SERVER_ERROR,
      "Failed to initiate OAuth login"
    );
  }

  if (!data?.url) {
    throwAndLogError(
      null,
      AppErrorCode.SERVER_ERROR,
      "Missing redirect URL from Supabase OAuth login"
    );
  }

  redirect(data.url);
}
