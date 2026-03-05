import type { TypedSupabaseClient } from "../../types";

export const PreyBonusesRepo = {
  /**
   * Fetches the catalog of all available prey bonuses.
   */
  getAll: (supabase: TypedSupabaseClient) => {
    return supabase.from("prey_bonuses").select("id, description, bonus_value, bonus_type");
  },
};
