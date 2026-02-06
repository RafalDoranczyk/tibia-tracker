import { createSupabaseServer } from "@/lib/supabase";

import { SUPABASE_CONFIG } from "./config";

// --- Project-specific server client ---
export function createServerSupabase() {
  return createSupabaseServer(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
}
