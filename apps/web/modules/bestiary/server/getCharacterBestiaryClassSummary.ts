import { getUserScopedQuery } from "@/core";

import { BestiaryCacheTags } from "../cacheTags";
import { type BestiaryClass, CharacterBestiaryClassSummarySchema } from "../schemas";

export async function getCharacterBestiaryClassSummary(
  characterId: string,
  bestiaryClass: BestiaryClass
) {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("character_bestiary_class_summary")
    .select("*")
    .eq("character_id", characterId)
    .eq("bestiary_class", bestiaryClass)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const parsed = data
    ? CharacterBestiaryClassSummarySchema.parse(data)
    : CharacterBestiaryClassSummarySchema.parse({
        character_id: characterId,
        bestiary_class: bestiaryClass,
        total_monsters: 0,
        completed_monsters: 0,
        completed_soulpits: 0,
        total_charm_points: 0,
        unlocked_charm_points: 0,
      });

  return {
    data: parsed,
    cacheTag: BestiaryCacheTags.classSummary(characterId, bestiaryClass),
  };
}
