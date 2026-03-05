import type { TypedSupabaseClient } from "../../types";

export const ItemsRepo = {
  /**
   * Fetches the global catalog of all items.
   */
  getAll: (supabase: TypedSupabaseClient) => {
    return supabase
      .from("items")
      .select("id, name, image_path, created_at, tibia_item_id, updated_at")
      .order("name", { ascending: true });
  },
};
