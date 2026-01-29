import { getUserScopedQuery } from "@/core";

import type { LootedItemCount } from "../types";

export async function insertSessionLootedItems(sessionId: number, lootedItems: LootedItemCount[]) {
  if (!lootedItems.length) return;

  const { supabase } = await getUserScopedQuery();

  const payload = lootedItems.map((m) => ({
    session_id: sessionId,
    item_id: m.id,
    count: m.count,
  }));

  if (!payload.length) return;

  const { error } = await supabase.from("hunt_session_looted_items").insert(payload);

  if (error) {
    throw new Error("Failed to insert session looted items");
  }
}

export async function deleteSessionLootedItems(sessionId: number) {
  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase
    .from("hunt_session_looted_items")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    throw new Error("Failed to delete session looted items");
  }
}
