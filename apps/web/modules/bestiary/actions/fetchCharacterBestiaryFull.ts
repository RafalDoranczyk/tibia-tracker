"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { CharacterBestiarySchema, MonsterSchema } from "../schemas";

const DEFAULT_LIMIT = 15;

type Props = {
  characterId: string;
  bestiaryClass?: string;
  limit: number;
  page: number;
  search?: string;
};

export async function fetchCharacterBestiaryFull({
  characterId,
  bestiaryClass,
  limit = DEFAULT_LIMIT,
  page = 1,
  search,
}: Props) {
  const offset = (page - 1) * limit;
  const { supabase } = await getUserScopedQuery();

  let monstersQuery = supabase
    .from("monsters")
    .select("*", { count: "exact" })
    .order("sort_order")
    .range(offset, offset + limit - 1);

  if (bestiaryClass) monstersQuery = monstersQuery.eq("bestiary_class", bestiaryClass);

  if (search) {
    monstersQuery = monstersQuery.ilike("name", `%${search}%`);
  }

  const { data: monstersData, error: monstersError, count } = await monstersQuery;
  if (monstersError) throw new Error(monstersError.message);

  const monsters = assertZodParse(MonsterSchema.array(), monstersData ?? []);

  if (monsters.length === 0) {
    return { monsters: [], totalCount: count ?? 0, totalPages: 0 };
  }

  const monsterIds = monsters.map((m) => m.id);

  const { data: bestiaryData, error: bestiaryError } = await supabase
    .from("character_bestiary")
    .select("*")
    .eq("character_id", characterId)
    .in("monster_id", monsterIds);

  if (bestiaryError) throw new Error(bestiaryError.message);

  const bestiary = assertZodParse(CharacterBestiarySchema.array(), bestiaryData ?? []);

  const merged = monsters.map((monster) => {
    const progress = bestiary.find((b) => b.monster_id === monster.id);
    return {
      ...monster,
      kills: progress?.kills ?? 0,
      stage: progress?.stage ?? 0,
      has_soul: progress?.has_soul ?? false,
    };
  });

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  return { monsters: merged, totalCount, totalPages };
}
