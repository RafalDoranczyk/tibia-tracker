"use server";

import { cache } from "react";
import { z } from "zod";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { DamageElementSchema } from "../schemas";
import type { DamageElement } from "../types";

const damageElementColumns = Object.keys(DamageElementSchema.shape).join(", ");

async function fetchDamageElementsInternal(): Promise<DamageElement[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("damage_elements")
    .select(damageElementColumns)
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch damage elements");
  }

  return assertZodParse(z.array(DamageElementSchema), data);
}

export const fetchDamageElements = cache(fetchDamageElementsInternal);
