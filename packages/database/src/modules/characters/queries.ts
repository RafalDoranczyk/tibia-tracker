import type { TypedSupabaseClient } from "../../types";
import type { UserID } from "../user";
import type { CharacterID } from "./schemas";

type DbGetCharacterPayload = {
  supabase: TypedSupabaseClient;
  userId: UserID;
  characterId: CharacterID;
};

export function dbGetCharacter({ supabase, userId, characterId }: DbGetCharacterPayload) {
  return supabase
    .from("characters")
    .select("id, name, global_character_id")
    .eq("id", characterId)
    .eq("user_id", userId)
    .single();
}

type DbGetCharacterListPayload = {
  supabase: TypedSupabaseClient;
  userId: UserID;
};

export function dbGetCharacterList({ supabase, userId }: DbGetCharacterListPayload) {
  return supabase
    .from("characters")
    .select("id, name, global_character_id")
    .order("name", { ascending: true })
    .eq("user_id", userId);
}

type DbGetCharacterWithGlobalInfoPayload = {
  supabase: TypedSupabaseClient;
  characterId: string;
};

export function dbGetCharacterWithGlobalInfo({
  supabase,
  characterId,
}: DbGetCharacterWithGlobalInfoPayload) {
  return supabase
    .from("characters")
    .select(`
      id,
      name,
      global_character_id,
      global:global_characters (
        id,
        name,
        world,
        vocation,
        last_sync_at
      )
    `)
    .eq("id", characterId)
    .single();
}
