import type { TypedSupabaseClient } from "@/core/supabase/types";

// Fetches all charms available in the system, regardless of character progress.
export function getCharms(supabase: TypedSupabaseClient) {
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
}
