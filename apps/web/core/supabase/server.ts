import type { Database, TypedSupabaseClient } from "@repo/database";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/core/env";

/**
 * DYNAMIC CLIENT (Requires Cookies)
 */
export async function createServerSupabase(): Promise<TypedSupabaseClient> {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
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
    }
  ) as unknown as TypedSupabaseClient;
}
