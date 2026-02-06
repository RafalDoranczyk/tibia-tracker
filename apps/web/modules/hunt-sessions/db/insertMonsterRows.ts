import { requireAuthenticatedSupabase } from "@/core/supabase";

import type { HuntSessionKilledMonsterInput } from "../schemas";

type InsertedMonster = {
  id: number;
  monster_id: number;
};

type BonusTable = "hunt_session_prey_bonuses" | "hunt_session_charm_bonuses";

async function insertBonuses<T extends keyof HuntSessionKilledMonsterInput>(
  table: BonusTable,
  bonusKey: T,
  bonusColumn: string,
  monsters: HuntSessionKilledMonsterInput[],
  monsterIdToSessionMonsterId: Map<number, number>,
  supabase: Awaited<ReturnType<typeof requireAuthenticatedSupabase>>["supabase"]
) {
  const rows = monsters
    .filter((m) => m[bonusKey])
    .map((m) => {
      const sessionMonsterId = monsterIdToSessionMonsterId.get(m.monster_id);
      if (!sessionMonsterId) return null;

      return {
        hunt_session_monster_id: sessionMonsterId,
        [bonusColumn]: m[bonusKey],
      };
    })
    .filter(
      (row): row is { hunt_session_monster_id: number } & Record<string, number> => row !== null
    );

  if (!rows.length) return;

  const { error } = await supabase.from(table).insert(rows);
  if (error) throw error;
}

export async function insertSessionMonstersWithPreyAndCharm(
  session_id: number,
  monsters: HuntSessionKilledMonsterInput[]
) {
  const { supabase } = await requireAuthenticatedSupabase();

  /**
   * 1️⃣ Insert killed monsters
   */
  const { data: insertedMonsters, error } = await supabase
    .from("hunt_session_killed_monsters")
    .insert(
      monsters.map((m) => ({
        session_id,
        monster_id: m.monster_id,
        count: m.count,
      }))
    )
    .select("id, monster_id");

  if (error || !insertedMonsters) {
    throw new Error("Failed to insert killed monsters");
  }

  /**
   * 2️⃣ Build monster_id → hunt_session_monster_id map
   */
  const monsterIdToSessionMonsterId = new Map<number, number>(
    insertedMonsters.map((im: InsertedMonster) => [im.monster_id, im.id])
  );

  /**
   * 3️⃣ Insert prey bonuses
   */
  await insertBonuses(
    "hunt_session_prey_bonuses",
    "prey_bonus_id",
    "prey_id",
    monsters,
    monsterIdToSessionMonsterId,
    supabase
  );

  /**
   * 4️⃣ Insert charm bonuses
   */
  await insertBonuses(
    "hunt_session_charm_bonuses",
    "charm_bonus_id",
    "charm_id",
    monsters,
    monsterIdToSessionMonsterId,
    supabase
  );
}

export async function replaceSessionMonstersWithPreyAndCharm(
  session_id: number,
  monsters: HuntSessionKilledMonsterInput[]
) {
  const { supabase } = await requireAuthenticatedSupabase();

  // delete monsters (cascade deletes prey and charm)
  await supabase.from("hunt_session_killed_monsters").delete().eq("session_id", session_id);

  // insert again with prey and charm
  await insertSessionMonstersWithPreyAndCharm(session_id, monsters);
}
