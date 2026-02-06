"use server";

import { cache } from "react";
import { z } from "zod";

import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type MonsterPreview, MonsterPreviewSchema } from "../schemas";

const SELECT = Object.keys(MonsterPreviewSchema.shape).join(", ");

async function fetchMonstersInternal(): Promise<MonsterPreview[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("monsters")
    .select(SELECT)
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch monsters");
  }

  return assertZodParse(z.array(MonsterPreviewSchema), data);
}

export const fetchMonstersPreview = cache(fetchMonstersInternal);
