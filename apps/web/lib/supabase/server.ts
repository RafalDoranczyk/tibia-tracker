"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/core/supabase";

/**
 * Creates a Supabase client configured for Server Components / Server Actions.
 */
export async function createSupabaseServer(url: string, key: string) {
  const cookieStore = await cookies();

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          for (const { name, options, value } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Component – ignore if middleware refreshes sessions
        }
      },
    },
  });
}
