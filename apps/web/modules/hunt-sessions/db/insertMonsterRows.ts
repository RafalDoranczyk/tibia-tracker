import { getUserScopedQuery } from "@/core/supabase";

import type { HuntSessionKilledMonsterInput } from "../schemas";

type InsertedMonster = {
  id: number;
  session_id: number;
  count: number;
  monster_id: number;
};

async function insertMonsterRows(
  session_id: number,
  monsters: HuntSessionKilledMonsterInput[]
): Promise<InsertedMonster[]> {
  const { supabase } = await getUserScopedQuery();

  const { data: insertedMonsters, error } = await supabase
    .from("hunt_session_killed_monsters")
    .insert(
      monsters.map((m) => ({
        session_id,
        monster_id: m.monster_id,
        count: m.count,
      }))
    )
    .select("id, session_id, count, monster_id");

  if (error) {
    throw new Error("Failed to insert killed monsters");
  }

  return insertedMonsters ?? [];
}

async function insertPreyBonuses(
  insertedMonsters: InsertedMonster[],
  monsters: HuntSessionKilledMonsterInput[]
) {
  const { supabase } = await getUserScopedQuery();

  const preyRows = monsters
    .filter((m) => m.prey_bonus_id)
    .map((m) => {
      const inserted = insertedMonsters.find((im) => im.monster_id === m.monster_id);

      if (!inserted) return null;

      return {
        hunt_session_monster_id: inserted.id,
        prey_id: m.prey_bonus_id,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  if (!preyRows.length) return;

  const { error } = await supabase.from("hunt_session_prey_bonuses").insert(preyRows);
  if (error) throw error;
}

export async function insertSessionMonstersWithPrey(
  session_id: number,
  monsters: HuntSessionKilledMonsterInput[]
) {
  const inserted = await insertMonsterRows(session_id, monsters);
  await insertPreyBonuses(inserted, monsters);
}
