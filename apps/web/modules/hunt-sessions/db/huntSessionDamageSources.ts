import { getUserScopedQuery } from "@/core";

import type { HuntSessionDamageSource } from "../types";

export async function insertSessionDamageSources(
  sessionId: number,
  damageSources: HuntSessionDamageSource[]
) {
  if (!damageSources.length) return;
  const { supabase } = await getUserScopedQuery();

  const payload = damageSources.map((d) => ({
    session_id: sessionId,
    percent: d.percent,
    monster_id: d.damage_source.id,
  }));

  if (!payload.length) return;

  const { error } = await supabase.from("hunt_session_damage_sources").insert(payload);

  if (error) {
    throw new Error("Failed to insert session damage sources");
  }
}

export async function deleteSessionDamageSources(sessionId: number) {
  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase
    .from("hunt_session_damage_sources")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    throw new Error("Failed to delete session damage sources");
  }
}
