import type { SupabaseClient } from "@supabase/supabase-js";

import { type BestiaryClass, CharacterBestiaryClassSummarySchema } from "../../schemas";

const TABLE = "character_bestiary_class_summary";
const SELECT = CharacterBestiaryClassSummarySchema.keyof().options.join(", ");

export function bestiaryClassSummaryQuery(
  supabase: SupabaseClient,
  characterId: string,
  bestiaryClass: BestiaryClass
) {
  return supabase
    .from(TABLE)
    .select(SELECT)
    .eq("character_id", characterId)
    .eq("bestiary_class", bestiaryClass)
    .maybeSingle();
}
