import type { TypedSupabaseClient } from "@/core/supabase/types";

import type { UpdateCharacterBestiaryPayload } from "../../schemas";

export async function upsertCharacterBestiary(
  supabase: TypedSupabaseClient,
  payload: UpdateCharacterBestiaryPayload
) {
  const { character_id, monster_id, kills, stage, has_soul } = payload;

  return supabase.from("character_bestiary").upsert(
    {
      character_id,
      monster_id,
      kills,
      stage,
      has_soul,
    },
    {
      onConflict: "character_id, monster_id",
    }
  );
}
