import type { TypedSupabaseClient } from "@/core/supabase/types";

import type { Character } from "../../schemas";

export function updateCharacter(
  supabase: TypedSupabaseClient,
  id: string,
  data: Partial<Character>
) {
  return supabase.from("characters").update(data).eq("id", id).select().single();
}
