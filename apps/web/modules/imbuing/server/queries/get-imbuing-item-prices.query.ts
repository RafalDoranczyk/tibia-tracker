import type { TypedSupabaseClient } from "@/core/supabase/types";

export function getImbuingItemPrices(supabase: TypedSupabaseClient) {
  return supabase.from("imbuing_prices").select("key, price").order("key");
}
