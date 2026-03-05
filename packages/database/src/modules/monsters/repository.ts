import type { TypedSupabaseClient } from "../../types";

export const MonstersRepo = {
  /**
   * Fetches the global catalog of monsters, sorted alphabetically.
   */
  getAll: (supabase: TypedSupabaseClient) => {
    return supabase.from("monsters").select("*").order("name", { ascending: true });
  },
};
