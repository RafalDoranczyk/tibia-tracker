"use server";

import { cache } from "react";
import { z } from "zod";

import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type PreyBonus, PreyBonusSchema } from "../schemas";

const SELECT = Object.keys(PreyBonusSchema.shape).join(", ");

async function fetchPreyBonusesInternal(): Promise<PreyBonus[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase.from("prey_bonuses").select(SELECT);

  if (error) {
    throw new Error("Failed to fetch prey bonuses");
  }

  return assertZodParse(z.array(PreyBonusSchema), data);
}

export const fetchPreyBonuses = cache(fetchPreyBonusesInternal);
