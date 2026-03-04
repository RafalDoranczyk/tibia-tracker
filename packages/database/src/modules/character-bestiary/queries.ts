import type { TypedSupabaseClient } from "../../types";
import type { MonsterClass, MonsterDifficulty } from "../monsters";

type DbGetMonsterListWithProgressPayload = {
  supabase: TypedSupabaseClient;
  filters: {
    page: number;
    limit: number;
    stage?: string;
    bestiaryClass?: MonsterClass;
    bestiaryDifficulty?: MonsterDifficulty;
    search?: string;
  };
  characterId: string;
};

export function dbGetMonsterListWithProgressRPC({
  supabase,
  filters,
  characterId,
}: DbGetMonsterListWithProgressPayload) {
  const { page, limit, bestiaryClass, bestiaryDifficulty, search, stage } = filters;

  const offset = (page - 1) * limit;

  return supabase.rpc("get_monsters_with_character_progress", {
    p_character_id: characterId,
    p_search: search,
    p_monster_class: bestiaryClass,
    p_bestiary_difficulty: bestiaryDifficulty,
    p_stage_filter: stage,
    p_limit: limit,
    p_offset: offset,
  });
}
