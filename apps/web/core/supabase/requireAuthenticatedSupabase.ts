import { AppError, AppErrorCode } from "../error";
import { createServerSupabase } from "./createServerSupabase";
import type { TypedSupabaseClient } from "./types";

type AuthenticatedSupabaseResult = {
  supabase: TypedSupabaseClient;
  userId: string;
};

export async function requireAuthenticatedSupabase(): Promise<AuthenticatedSupabaseResult> {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, "User not authenticated");
  }

  return { supabase, userId: user.id };
}
