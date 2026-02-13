import { createClient } from "@supabase/supabase-js";

import { SUPABASE_CONFIG } from "../config";
import type { Database } from "../types";

/**
 * STATIC CLIENT (No Cookies)
 * Use for: unstable_cache ONLY.
 * Context: Prevents "Dynamic usage" errors and allows shared caching between users.
 */
export function createStaticSupabaseClient() {
  return createClient<Database>(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
}
