import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { SUPABASE_CONFIG } from "../config";
import type { TypedSupabaseClient } from "../types";

/**
 * DYNAMIC CLIENT (Requires Cookies)
 * Use for: Auth, Server Actions, and RLS-protected data.
 * Context: Any function where you need to know "Who is the user?".
 */
export async function createServerSupabase(): Promise<TypedSupabaseClient> {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          for (const { name, options, value } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Component – ignore if proxy refreshes sessions
        }
      },
    },
  });
}
