import { getUserScopedQuery } from "@/core";

import type { CreateHuntSessionPayload } from "../types";
import { insertSessionMonstersWithPrey } from "./insertMonsterRows";

export async function replaceSessionMonstersWithPrey(
  session_id: number,
  monsters: CreateHuntSessionPayload["killed_monsters"]
) {
  const { supabase } = await getUserScopedQuery();

  // delete monsters (cascade deletes prey)
  await supabase.from("hunt_session_killed_monsters").delete().eq("session_id", session_id);

  // insert again with prey
  await insertSessionMonstersWithPrey(session_id, monsters);
}
