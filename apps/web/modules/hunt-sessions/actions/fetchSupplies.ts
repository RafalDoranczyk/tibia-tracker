"use server";

import { cache } from "react";
import { z } from "zod";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type ItemPreview, ItemPreviewSchema } from "../schemas";

const SELECT = Object.keys(ItemPreviewSchema.shape).join(", ");

async function fetchSuppliesInternal(): Promise<ItemPreview[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("supplies")
    .select(SELECT)
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch supplies");
  }

  return assertZodParse(z.array(ItemPreviewSchema), data);
}

export const fetchSupplies = cache(fetchSuppliesInternal);
