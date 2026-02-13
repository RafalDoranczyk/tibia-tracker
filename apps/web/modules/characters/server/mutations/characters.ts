import type { TypedSupabaseClient } from "@/core/supabase/types";

import type { Character, CreateCharacterPayload } from "../../schemas";

export function dbInsertCharacter(supabase: TypedSupabaseClient, payload: CreateCharacterPayload) {
  return supabase.from("characters").insert([payload]).select().single();
}

export function dbUpdateCharacter(
  supabase: TypedSupabaseClient,
  id: string,
  data: Partial<Character>
) {
  return supabase.from("characters").update(data).eq("id", id).select().single();
}

export function dbDeleteCharacter(supabase: TypedSupabaseClient, id: string) {
  return supabase.from("characters").delete().eq("id", id);
}
