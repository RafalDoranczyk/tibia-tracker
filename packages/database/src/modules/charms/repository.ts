import type { TypedSupabaseClient } from "../../types";

export const CharmsRepo = {
  /**
   * Fetches the global catalog of all available charms.
   */
  getAll: (supabase: TypedSupabaseClient) => {
    return supabase.from("charms").select(`
      id,
      name,
      type,
      description,
      cost_lvl1,
      effect_lvl1,
      cost_lvl2,
      effect_lvl2,
      cost_lvl3,
      effect_lvl3,
      image_path
    `);
  },
};
