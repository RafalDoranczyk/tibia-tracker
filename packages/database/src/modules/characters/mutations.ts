import type { Enums, TypedSupabaseClient } from "../../types";
import type { UserID } from "../user";
import type { CharacterID, CharacterVocation, SetupNewCharacterPayload } from "./schemas";

export function dbDeleteCharacter({
  supabase,
  userId,
  characterId,
}: {
  supabase: TypedSupabaseClient;
  userId: UserID;
  characterId: CharacterID;
}) {
  return supabase.from("characters").delete().eq("user_id", userId).eq("id", characterId);
}

export function dbUpdateSyncStatus({
  supabase,
  globalCharacterId,
  status,
}: {
  supabase: TypedSupabaseClient;
  globalCharacterId: string;
  status: Enums<"sync_status">;
}) {
  return supabase
    .from("global_characters")
    .update({ sync_status: status })
    .eq("id", globalCharacterId);
}

export function dbCompleteSync({
  supabase,
  character,
}: {
  supabase: TypedSupabaseClient;
  character: { id: string; world: string; vocation: CharacterVocation };
}) {
  return supabase
    .from("global_characters")
    .update({
      last_sync_at: new Date().toISOString(),
      sync_status: "idle",
      world: character.world,
      vocation: character.vocation,
    })
    .eq("id", character.id);
}

export function dbSetupNewCharacterRPC({
  supabase,
  payload,
}: {
  supabase: TypedSupabaseClient;
  payload: SetupNewCharacterPayload;
}) {
  return supabase.rpc("setup_new_character", {
    p_name: payload.name,
    p_world: payload.world,
    p_vocation: payload.vocation,
    p_user_id: payload.userId,
  });
}
