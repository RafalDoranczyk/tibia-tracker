import type { TypedSupabaseClient } from "@/core/supabase/types";
import type { CreateCharacterExpHistoryInput } from "../../schemas";

export function dbInsertCharacterExperienceLog(
  supabase: TypedSupabaseClient,
  records: CreateCharacterExpHistoryInput[]
) {
  return supabase
    .from("experience_log")
    .upsert(records, { onConflict: "character_name, recorded_at" });
}
