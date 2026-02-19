import type { TypedSupabaseClient } from "@/core/supabase/types";
import type { FetchCharacterBestiaryPayload } from "../../schemas";

export function dbGetMonsterListWithProgress(
  supabase: TypedSupabaseClient,
  { filters, characterId }: FetchCharacterBestiaryPayload
) {
  const { page, limit, bestiaryClass, bestiaryDifficulty, search, stage } = filters;

  const offset = (page - 1) * limit;

  return supabase.rpc("get_monsters_with_character_progress", {
    p_character_id: characterId,
    p_search: search,
    p_bestiary_class: bestiaryClass,
    p_bestiary_difficulty: bestiaryDifficulty,
    p_stage_filter: stage,
    p_limit: limit,
    p_offset: offset,
  });
}
