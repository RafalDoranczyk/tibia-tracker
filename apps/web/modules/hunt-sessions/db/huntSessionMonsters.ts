import { getUserScopedQuery } from "@/core";

import type { MonsterCount } from "../types";

export async function insertSessionMonsters(sessionId: number, monsters: MonsterCount[]) {
  if (!monsters.length) return;

  const { supabase } = await getUserScopedQuery();

  const payload = monsters.map((m) => ({
    session_id: sessionId,
    monster_id: m.id,
    count: m.count,
  }));

  if (!payload.length) return;

  const { error } = await supabase.from("hunt_session_monster_kills").insert(payload);

  if (error) {
    throw new Error("Failed to insert session monsters");
  }
}

export async function deleteSessionMonsters(sessionId: number) {
  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase
    .from("hunt_session_monster_kills")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    throw new Error("Failed to delete session monsters");
  }
}
