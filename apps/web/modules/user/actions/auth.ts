"use server";

import { redirect } from "next/navigation";

import { AppError, AppErrorCode } from "@/core/error";
import { createServerSupabase, mapSupabaseErrorToAppError } from "@/core/supabase";
import { env } from "@/env";
import { assertZodParse } from "@/utils";

import { OAuthProvider } from "../schemas/user.schema";

async function loginWithOAuth(provider: OAuthProvider) {
  const parsedProvider = assertZodParse(OAuthProvider, provider);

  const supabase = await createServerSupabase();

  const redirectTo = env.NEXT_PUBLIC_AUTH_CALLBACK_URL;

  const { data, error } = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo,
    },
    provider: parsedProvider,
  });

  if (error) {
    throw mapSupabaseErrorToAppError(error);
  }

  if (!data?.url) {
    throw new AppError(AppErrorCode.SERVER_ERROR, "Missing redirect URL from Supabase OAuth login");
  }

  redirect(data.url);
}

export async function loginWithGithub() {
  return loginWithOAuth("github");
}

export async function loginWithGoogle() {
  return loginWithOAuth("google");
}

export async function logout() {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signOut({ scope: "global" });

  if (error) {
    throw mapSupabaseErrorToAppError(error);
  }

  redirect("/");
}
