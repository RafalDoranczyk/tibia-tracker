import type { SupabaseClient } from "@supabase/supabase-js";

import type { BestiaryFilters } from "../../schemas";

const RPC_NAME = "monsters_with_character_progress";

export async function monstersWithProgressQuery(
  supabase: SupabaseClient,
  characterId: string,
  filters: BestiaryFilters
) {
  const { page, limit, bestiaryClass, bestiaryDifficulty, search, stage } = filters;

  const offset = (page - 1) * limit;

  return supabase.rpc(RPC_NAME, {
    p_character_id: characterId,
    p_search: search ?? null,
    p_bestiary_class: bestiaryClass ?? null,
    p_bestiary_difficulty: bestiaryDifficulty ?? null,
    p_stage_filter: stage ?? null,
    p_limit: limit,
    p_offset: offset,
  });
}
