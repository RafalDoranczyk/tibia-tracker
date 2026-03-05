import type { TypedSupabaseClient } from "../../types";
import type { CharacterID } from "../characters";
import type { MonsterClass, MonsterDifficulty } from "../monsters";
import type { BestiaryStageFilter, CharacterBestiary } from "./schemas";

export const CharacterBestiaryRepo = {
  upsert: (supabase: TypedSupabaseClient, payload: Omit<CharacterBestiary, "created_at">) => {
    return supabase.from("character_bestiary").upsert(payload, {
      onConflict: "character_id, monster_id",
    });
  },

  getListWithProgress: (supabase: TypedSupabaseClient, payload: GetProgressPayload) => {
    const { characterId, filters } = payload;
    const offset = (filters.page - 1) * filters.limit;

    return supabase.rpc("get_monsters_with_character_progress", {
      p_character_id: characterId,
      p_search: filters.search,
      p_monster_class: filters.bestiaryClass,
      p_bestiary_difficulty: filters.bestiaryDifficulty,
      p_stage_filter: filters.stage,
      p_limit: filters.limit,
      p_offset: offset,
    });
  },

  getClassSummary: (supabase: TypedSupabaseClient, payload: GetClassSummaryPayload) => {
    return supabase
      .from("character_bestiary_class_summary")
      .select(`
        character_id,
        monster_class,
        total_monsters,
        completed_monsters,
        completed_soulpits,
        total_charm_points,
        unlocked_charm_points
      `)
      .eq("character_id", payload.characterId)
      .eq("monster_class", payload.bestiaryClass)
      .maybeSingle();
  },

  getBestiarySummary: (supabase: TypedSupabaseClient, characterId: CharacterID) => {
    return supabase
      .from("character_bestiary_summary")
      .select(`
        character_id,
        unlocked_charm_points,
        total_charm_points,
        completed_soulpits
        `)
      .eq("character_id", characterId)
      .maybeSingle();
  },
};

type GetProgressPayload = {
  characterId: CharacterID;
  filters: {
    page: number;
    limit: number;
    search?: string;
    stage?: BestiaryStageFilter;
    bestiaryClass?: MonsterClass;
    bestiaryDifficulty?: MonsterDifficulty;
  };
};

type GetClassSummaryPayload = {
  characterId: CharacterID;
  bestiaryClass: MonsterClass;
};
