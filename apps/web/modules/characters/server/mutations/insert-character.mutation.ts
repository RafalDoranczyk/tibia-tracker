import type { TypedSupabaseClient } from "@/core/supabase";

import type { CreateCharacterPayload } from "../../schemas";

export function insertCharacter(supabase: TypedSupabaseClient, payload: CreateCharacterPayload) {
  return supabase.from("characters").insert([payload]).select().single();
}
