"use server";

import { cache } from "react";
import { z } from "zod";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type DamageElement, DamageElementSchema } from "../schemas";

const SELECT = Object.keys(DamageElementSchema.shape).join(", ");

async function fetchDamageElementsInternal(): Promise<DamageElement[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("damage_elements")
    .select(SELECT)
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch damage elements");
  }

  return assertZodParse(z.array(DamageElementSchema), data);
}

export const fetchDamageElements = cache(fetchDamageElementsInternal);
