"use server";

import { z } from "zod";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type ImbuingItem, ImbuingItemSchema } from "../schemas";

const imbuingItemKeys = Object.keys(ImbuingItemSchema.shape).join(", ");

export async function fetchImbuingItemPrices(): Promise<ImbuingItem[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("imbuing_prices").select(imbuingItemKeys);

  if (error) {
    throw new Error("Failed to fetch imbuing item prices");
  }

  return assertZodParse(z.array(ImbuingItemSchema), data);
}
