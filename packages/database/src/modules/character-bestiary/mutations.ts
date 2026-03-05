import type { TypedSupabaseClient } from "../../types";

type DbUpsertCharacterBestiaryPayload = {
  supabase: TypedSupabaseClient;
  payload: {
    character_id: string;
    monster_id: number;
    kills: number;
    stage: number;
    has_soul: boolean;
  };
};

export async function dbUpsertCharacterBestiary({
  supabase,
  payload,
}: DbUpsertCharacterBestiaryPayload) {
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
