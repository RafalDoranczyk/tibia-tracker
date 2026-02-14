import type { User } from "@supabase/supabase-js";
import { cache } from "react";

import { AppError, AppErrorCode } from "../../error";
import type { TypedSupabaseClient } from "../types";
import { createServerSupabase } from "./server";

type AuthenticatedSupabaseResult = {
  supabase: TypedSupabaseClient;
  user: User;
};

/**
 * AUTH GUARD (Security)
 * Use for: Protecting routes and loaders.
 * Context: Ensures the user is logged in before proceeding to data fetching or actions.
 */
export const requireAuthenticatedSupabase = cache(
  async (): Promise<AuthenticatedSupabaseResult> => {
    const supabase = await createServerSupabase();
    console.log("🔥 GUARD EXECUTED");
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, "User not authenticated");
    }

    return { supabase, user };
  }
);
