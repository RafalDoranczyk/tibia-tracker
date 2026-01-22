import { getUserScopedQuery } from "@/core";

import type { SupplyCount } from "../types";

export async function insertSessionSupplies(sessionId: number, supplies: SupplyCount[]) {
  if (!supplies.length) return;

  const { supabase } = await getUserScopedQuery();

  const payload = supplies.map((s) => ({
    session_id: sessionId,
    supply_id: s.id,
    count: s.count,
    count_per_hour: s.count_per_hour,
  }));

  if (!payload.length) return;

  const { error } = await supabase.from("hunt_session_supplies").insert(payload);

  if (error) {
    throw new Error("Failed to insert session supplies");
  }
}

export async function deleteSessionSupplies(sessionId: number) {
  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase
    .from("hunt_session_supplies")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    throw new Error("Failed to delete session supplies");
  }
}
