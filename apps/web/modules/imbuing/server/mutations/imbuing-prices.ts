import type { TypedSupabaseClient } from "@/core/supabase/types";

import type { ImbuingItem } from "../../schemas";

export function dbUpsertImbuingItemPrices(supabase: TypedSupabaseClient, p_prices: ImbuingItem[]) {
  return supabase.rpc("upsert_imbuing_prices", {
    p_prices,
  });
}
