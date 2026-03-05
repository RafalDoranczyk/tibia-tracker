import type { TypedSupabaseClient } from "../../types";

export const DamageElementsRepo = {
  /**
   * Fetches the list of all damage elements, sorted alphabetically.
   */
  getAll: (supabase: TypedSupabaseClient) => {
    return supabase
      .from("damage_elements")
      .select("id, name, image_path, slug")
      .order("name", { ascending: true });
  },
};
