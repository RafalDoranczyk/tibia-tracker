import { AppError, AppErrorCode } from "../../error";
import type { TypedSupabaseClient } from "../types";
import { createServerSupabase } from "./server";

type AuthenticatedSupabaseResult = {
  supabase: TypedSupabaseClient;
  userId: string;
};

/**
 * AUTH GUARD (Security)
 * Use for: Protecting routes and loaders.
 * Context: Ensures the user is logged in before proceeding to data fetching or actions.
 */
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
