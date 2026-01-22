"use server";

import { cache } from "react";
import { z } from "zod";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { MonsterPreviewSchema } from "../schemas";
import type { MonsterPreview } from "../types";

const monsterColumns = Object.keys(MonsterPreviewSchema.shape).join(", ");

async function fetchMonstersInternal(): Promise<MonsterPreview[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("monsters")
    .select(monsterColumns)
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch monsters");
  }

  return assertZodParse(z.array(MonsterPreviewSchema), data);
}

export const fetchMonstersPreview = cache(fetchMonstersInternal);
