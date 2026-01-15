import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for client-side components (browser context).
 */
export function createSupabaseClient(url: string, key: string) {
  return createBrowserClient(url, key);
}
