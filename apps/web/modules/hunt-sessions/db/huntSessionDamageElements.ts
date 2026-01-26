import { getUserScopedQuery } from "@/core";

import type { DamageElementCount } from "../types";

export async function insertSessionDamageElements(
  sessionId: number,
  damageElements: DamageElementCount[]
) {
  const { supabase } = await getUserScopedQuery();

  const payload = damageElements.map((d) => ({
    session_id: sessionId,
    percent: d.percent,
    damage_element_id: d.id,
  }));

  const { error } = await supabase.from("hunt_session_damage_elements").insert(payload);

  if (error) {
    throw new Error("Failed to insert session damage elements");
  }
}

export async function deleteSessionDamageElements(sessionId: number) {
  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase
    .from("hunt_session_damage_elements")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    throw new Error("Failed to delete session damage elements");
  }
}
