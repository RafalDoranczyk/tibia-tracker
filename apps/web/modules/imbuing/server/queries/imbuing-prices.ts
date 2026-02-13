import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetImbuingItemPrices(supabase: TypedSupabaseClient) {
  return supabase.from("imbuing_prices").select("key, price").order("key");
}
