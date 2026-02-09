import type { SupabaseClient } from "@supabase/supabase-js";

import { CharacterBestiarySummarySchema } from "../../schemas";

const TABLE = "character_bestiary_summary";
const SELECT = CharacterBestiarySummarySchema.keyof().options.join(", ");

export async function getCharacterBestiarySummaryQuery(
  supabase: SupabaseClient,
  characterId: string
) {
  return supabase.from(TABLE).select(SELECT).eq("character_id", characterId).maybeSingle();
}
