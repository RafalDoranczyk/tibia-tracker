import type { NextRequest } from "next/server";

import { createSupabaseMiddleware } from "@/lib/supabase";

import { supabaseConfig } from "./config";

export function createMiddlewareClient(request: NextRequest) {
  return createSupabaseMiddleware(request, supabaseConfig.url, supabaseConfig.key);
}
