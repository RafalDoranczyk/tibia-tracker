import type { Database } from "@repo/database";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_CONFIG } from "../config";

/**
 * STATIC CLIENT (No Cookies)
 * Context: Prevents "Dynamic usage" errors and allows shared caching between users.
 */
export function createStaticSupabaseClient() {
  return createClient<Database>(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}
