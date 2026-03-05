import type { TypedSupabaseClient } from "../../types";
import type { Tables } from "../../types/db";

type DbInsertCharacterExperiencePayload = {
  supabase: TypedSupabaseClient;
  records: Omit<Tables<"experience_log">, "id" | "created_at">[];
};

export function dbInsertCharacterExperienceLog({
  supabase,
  records,
}: DbInsertCharacterExperiencePayload) {
  return supabase
    .from("experience_log")
    .upsert(records, { onConflict: "global_character_id, recorded_at" });
}
