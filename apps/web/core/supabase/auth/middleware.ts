import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { SUPABASE_CONFIG } from "../config";

export function createSupabaseMiddleware(request: NextRequest) {
  // return createSupabaseMiddleware(request, SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }

        supabaseResponse = NextResponse.next({ request });
        for (const { name, options, value } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options);
        }
      },
    },
  });

  return { supabase, response: supabaseResponse };
}
