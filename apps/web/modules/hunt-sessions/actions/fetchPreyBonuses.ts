"use server";

import { cache } from "react";
import { z } from "zod";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { PreyBonusSchema } from "../schemas";
import type { PreyBonus } from "../types";

const columns = Object.keys(PreyBonusSchema.shape).join(", ");

async function fetchPreyBonusesInternal(): Promise<PreyBonus[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("prey_bonuses").select(columns);

  if (error) {
    throw new Error("Failed to fetch prey bonuses");
  }

  return assertZodParse(z.array(PreyBonusSchema), data);
}

export const fetchPreyBonuses = cache(fetchPreyBonusesInternal);
