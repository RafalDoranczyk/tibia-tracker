import { createSupabaseServer } from "@/lib/supabase";

import { SUPABASE_CONFIG } from "./config";
import type { TypedSupabaseClient } from "./types";

// --- Project-specific server client ---
export function createServerSupabase(): Promise<TypedSupabaseClient> {
  return createSupabaseServer(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
}
