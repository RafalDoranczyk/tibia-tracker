"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { BESTIARY_DEFAULT_LIMIT } from "../constants";
import { mergeMonstersWithBestiary } from "../mappers/mergeMonsterWithBestiary";
import {
  CharacterBestiarySchema,
  type FetchCharacterBestiaryParams,
  MonsterSchema,
  type MonsterWithCharacterProgress,
} from "../schemas";

type FetchCharacterBestiaryFullResult = {
  monstersWithProgress: MonsterWithCharacterProgress[];
  totalCount: number;
  totalPages: number;
};

const MONSTER_COLUMNS = MonsterSchema.keyof().options.join(", ");
const CHARACTER_BESTIARY_COLUMNS = CharacterBestiarySchema.keyof().options.join(", ");

export async function fetchCharacterBestiaryFull({
  characterId,
  bestiaryClass,
  limit = BESTIARY_DEFAULT_LIMIT,
  page = 1,
  search,
}: FetchCharacterBestiaryParams): Promise<FetchCharacterBestiaryFullResult> {
  const { supabase } = await requireAuthenticatedSupabase();

  const offset = (page - 1) * limit;

  let monstersQuery = supabase
    .from("monsters")
    .select(MONSTER_COLUMNS, { count: "exact" })
    .order("sort_order")
    .range(offset, offset + limit - 1);

  if (search) {
    monstersQuery = monstersQuery.ilike("name", `%${search}%`);
  } else if (bestiaryClass) {
    monstersQuery = monstersQuery.eq("bestiary_class", bestiaryClass);
  }

  const { data: monstersData, error, count } = await monstersQuery;

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch monsters data");
  }

  const monsters = assertZodParse(MonsterSchema.array(), monstersData ?? []);

  // If there are no monsters, we can skip the bestiary query and return early
  if (monsters.length === 0) {
    return {
      monstersWithProgress: [],
      totalCount: count ?? 0,
      totalPages: 0,
    };
  }

  const monsterIds = monsters.map(({ id }) => id);

  const { data: bestiaryData, error: bestiaryError } = await supabase
    .from("character_bestiary")
    .select(CHARACTER_BESTIARY_COLUMNS)
    .eq("character_id", characterId)
    .in("monster_id", monsterIds);

  if (bestiaryError) {
    throw wrapAndLogError(
      bestiaryError,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch bestiary data"
    );
  }

  const bestiary = assertZodParse(CharacterBestiarySchema.array(), bestiaryData ?? []);

  const monstersWithProgress = mergeMonstersWithBestiary(monsters, bestiary);
  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    monstersWithProgress,
    totalCount,
    totalPages,
  };
}
