import type { Enums, TypedSupabaseClient } from "../../types";
import type { CharacterID } from "../characters";
import type { GlobalCharacter } from "./schemas";

export const GlobalCharactersRepo = {
  /**
   * Get character with its global game data (e.g. for profile pages)
   */
  getWithInfo: (supabase: TypedSupabaseClient, characterId: CharacterID) => {
    return supabase
      .from("characters")
      .select(`
        id, name, global_character_id,
        global:global_characters (
          id, name, world, vocation, last_sync_at, 
          peak_experience, peak_level, peak_recorded_at
        )
      `)
      .eq("id", characterId)
      .single();
  },

  updateSyncStatus: (supabase: TypedSupabaseClient, { id, status }: DbUpdateSyncStatusPayload) => {
    return supabase.from("global_characters").update({ sync_status: status }).eq("id", id);
  },

  completeSync: (supabase: TypedSupabaseClient, character: DbCompleteSyncPayload) => {
    return supabase
      .from("global_characters")
      .update({
        last_sync_at: new Date().toISOString(),
        sync_status: "idle",
        world: character.world,
        vocation: character.vocation,
        peak_level: character.peak_level,
        peak_experience: character.peak_experience,
        peak_recorded_at: character.peak_recorded_at,
      })
      .eq("id", character.id);
  },
};

type DbUpdateSyncStatusPayload = {
  id: string;
  status: Enums<"sync_status">;
};

type DbCompleteSyncPayload = Omit<
  GlobalCharacter,
  "created_at" | "last_sync_at" | "sync_status" | "last_sync_error"
>;
