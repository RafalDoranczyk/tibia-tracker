import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetImbuingItemPrices(supabase: TypedSupabaseClient, userId: string) {
  return supabase.from("imbuing_prices").select("key, price").order("key").eq("user_id", userId);
}
