import type { TypedSupabaseClient } from "@/core/supabase/types";

import type { CreateCharacterPayload, UpdateCharacterPayload } from "../../schemas";

// INSERT
export function dbInsertCharacter(
  supabase: TypedSupabaseClient,
  userId: string,
  payload: CreateCharacterPayload
) {
  return supabase.from("characters").insert([payload]).eq("user_id", userId).select().single();
}

// UPDATE
export function dbUpdateCharacter(
  supabase: TypedSupabaseClient,
  userId: string,
  data: UpdateCharacterPayload
) {
  return supabase
    .from("characters")
    .update(data)
    .eq("user_id", userId)
    .eq("id", data.id)
    .select()
    .single();
}

// DELETE
export function dbDeleteCharacter(supabase: TypedSupabaseClient, userId: string, id: string) {
  return supabase.from("characters").delete().eq("user_id", userId).eq("id", id);
}

// SYNC
export function dbUpdateAllCharactersSynchronizedAt(supabase: TypedSupabaseClient, userId: string) {
  return supabase
    .from("characters")
    .update({ synchronized_at: new Date().toISOString() })
    .eq("user_id", userId);
}
