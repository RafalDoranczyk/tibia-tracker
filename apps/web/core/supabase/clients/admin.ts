import "server-only";

import { createClient } from "@supabase/supabase-js";

import { SUPABASE_CONFIG } from "../config";
import type { Database } from "../types";

/**
 * Creates a Supabase client with Service Role privileges.
 * * ⚠️ SECURITY WARNING:
 * This client bypasses Row Level Security (RLS).
 * It must ONLY be used on the server-side within secure loaders or actions.
 * Always ensure you have performed manual authorization checks (e.g., Auth Guards)
 * before fetching or mutating data with this client.
 * * NEVER export or use this in Client Components.
 */
export function createAdminClient() {
  if (!SUPABASE_CONFIG.serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY. Check your environment variables.");
  }

  return createClient<Database>(SUPABASE_CONFIG.url, SUPABASE_CONFIG.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
