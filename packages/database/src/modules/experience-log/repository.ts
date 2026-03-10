import type { TypedSupabaseClient } from "../../types";
import type { Tables } from "../../types/db";
import type { CharacterID } from "../characters";

export const ExperienceLogRepo = {
  /**
   * Fetches experience history from a specific date.
   */
  getHistory: (
    supabase: TypedSupabaseClient,
    { globalCharacterId, since }: DbGetHistoryPayload
  ) => {
    return supabase
      .from("experience_log")
      .select("*")
      .eq("global_character_id", globalCharacterId)
      .gte("recorded_at", since)
      .order("recorded_at", { ascending: false });
  },

  /**
   * Fetches experience history for the last 30 days.
   */
  getLast30Days: (supabase: TypedSupabaseClient, globalCharacterId: CharacterID) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    return ExperienceLogRepo.getHistory(supabase, {
      globalCharacterId,
      since: thirtyDaysAgo.toISOString(),
    });
  },

  /**
   * Fetches the most recent entry for sync validation.
   */
  getLastEntry: (supabase: TypedSupabaseClient, globalCharacterId: CharacterID) => {
    return supabase
      .from("experience_log")
      .select("recorded_at")
      .eq("global_character_id", globalCharacterId)
      .order("recorded_at", { ascending: false })
      .limit(1)
      .maybeSingle();
  },

  upsertBatch: (supabase: TypedSupabaseClient, records: UpsertExperienceRecord[]) => {
    return supabase
      .from("experience_log")
      .upsert(records, { onConflict: "global_character_id, recorded_at" });
  },
};

// --- Payloads ---
type DbGetHistoryPayload = {
  globalCharacterId: string;
  since: string;
};

type UpsertExperienceRecord = Omit<Tables<"experience_log">, "id" | "created_at">;
