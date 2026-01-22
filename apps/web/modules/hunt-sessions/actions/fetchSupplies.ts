"use server";

import { cache } from "react";
import { z } from "zod";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { SupplyItemSchema } from "../schemas";
import type { SupplyItem } from "../types";

const supplyColumns = Object.keys(SupplyItemSchema.shape).join(", ");

async function fetchSuppliesInternal(): Promise<SupplyItem[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("supplies")
    .select(supplyColumns)
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch supplies");
  }

  return assertZodParse(z.array(SupplyItemSchema), data);
}

export const fetchSupplies = cache(fetchSuppliesInternal);
