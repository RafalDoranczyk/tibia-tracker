"use server";

import { getUserScopedQuery } from "@/core";
import { MonsterSchema } from "@/modules/bestiary/schemas";
import { assertZodParse } from "@/utils";

type FetchMonstersProps = {
  search?: string;
  bestiaryClass?: string;
  limit?: number;
  offset?: number;
};

export async function fetchMonsters({
  search,
  bestiaryClass,
  limit,
  offset,
}: FetchMonstersProps = {}) {
  const { supabase } = await getUserScopedQuery();

  let query = supabase.from("monsters").select("*").order("sort_order", { ascending: true });

  if (bestiaryClass) query = query.eq("bestiary_class", bestiaryClass);
  if (search) query = query.ilike("name", `%${search}%`);
  if (limit !== undefined && offset !== undefined) query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return assertZodParse(MonsterSchema.array(), data ?? []);
}
