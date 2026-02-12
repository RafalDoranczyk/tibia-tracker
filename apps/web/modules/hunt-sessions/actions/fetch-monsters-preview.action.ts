"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type MonsterPreview, MonsterPreviewSchema } from "../schemas";
import { getMonsterListPreview } from "../server";

export async function fetchMonstersPreview(): Promise<MonsterPreview[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getMonsterListPreview(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch monsters");
  }

  return assertZodParse(MonsterPreviewSchema.array(), data);
}
