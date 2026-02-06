import type { NextRequest } from "next/server";

import { createSupabaseMiddleware } from "@/lib/supabase";

import { SUPABASE_CONFIG } from "./config";

export function createSupabaseMiddlewareClient(request: NextRequest) {
  return createSupabaseMiddleware(request, SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
}
