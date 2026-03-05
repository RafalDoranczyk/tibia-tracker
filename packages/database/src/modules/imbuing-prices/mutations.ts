import type { TypedSupabaseClient } from "../../types";
import type { ImbuingItem } from "./schemas";

type Props = {
  supabase: TypedSupabaseClient;
  prices: ImbuingItem[];
};

export function dbUpsertImbuingItemPricesRPC({ supabase, prices }: Props) {
  return supabase.rpc("upsert_imbuing_prices", {
    p_prices: prices,
  });
}
