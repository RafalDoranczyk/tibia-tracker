"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type Monster, MonsterSchema } from "../schemas";
import { getMonsterList } from "../server";

export async function fetchMonsterList(): Promise<Monster[]> {
  const { supabase } = await requireAuthenticatedSupabase();
  console.log("pobieram liste");
  const { data, error } = await getMonsterList(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch monsters");
  }

  return assertZodParse(MonsterSchema.array(), data);
}
