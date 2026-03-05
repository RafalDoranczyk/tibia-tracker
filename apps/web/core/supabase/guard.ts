import { AppError, AppErrorCode } from "@repo/errors";
import { cache } from "react";
import { createServerSupabase } from "./server";

/**
 * AUTH GUARD (Security)
 * Use for: Protecting routes and loaders.
 * Context: Ensures the user is logged in before proceeding to data fetching or actions.
 */
export const requireAuthenticatedSupabase = cache(async () => {
  const supabase = await createServerSupabase();
  console.log("🔥 GUARD EXECUTED");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, "User not authenticated");
  }

  return { supabase, user };
});
