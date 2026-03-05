import type { TypedSupabaseClient } from "../../types";

export const SuppliesRepo = {
  /**
   * Fetches the global catalog of available supplies.
   */
  getAll: (supabase: TypedSupabaseClient) => {
    return supabase
      .from("supplies")
      .select("id, name, image_path")
      .order("name", { ascending: true });
  },
};
