import type { TypedSupabaseClient } from "../../../types";

export const AdminGlobalCharactersRepo = {
  getAll: (supabase: TypedSupabaseClient) => {
    return supabase.from("global_characters").select("*");
  },
};
