import type { TypedSupabaseClient } from "../../types";
import type { UserID } from "../user";
import type { ImbuingItem } from "./schemas";

export const ImbuingPricesRepo = {
  /**
   * Fetches user-specific imbuing item prices.
   */
  getList: (supabase: TypedSupabaseClient, userId: UserID) => {
    return supabase.from("imbuing_prices").select("key, price").order("key").eq("user_id", userId);
  },

  /**
   * Upserts imbuing prices via RPC.
   */
  upsertBatch: (supabase: TypedSupabaseClient, prices: ImbuingItem[]) => {
    return supabase.rpc("upsert_imbuing_prices", {
      p_prices: prices,
    });
  },
};
