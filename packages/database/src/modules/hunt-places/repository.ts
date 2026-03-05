import type { TypedSupabaseClient } from "../../types";

export const HuntPlacesRepo = {
  /**
   * Fetches all available hunt places, ordered by name.
   */
  getAll: (supabase: TypedSupabaseClient) => {
    return supabase
      .from("hunt_places")
      .select("id, name, image_path")
      .order("name", { ascending: true });
  },
};
