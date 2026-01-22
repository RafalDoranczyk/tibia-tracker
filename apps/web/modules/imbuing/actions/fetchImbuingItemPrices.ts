"use server";

import { z } from "zod";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { ImbuingItemSchema } from "../schemas";
import type { ImbuingItem } from "../types";

const imbuingItemKeys = Object.keys(ImbuingItemSchema.shape).join(", ");

export async function fetchImbuingItemPrices(): Promise<ImbuingItem[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("imbuing_prices").select(imbuingItemKeys);

  if (error) {
    throw new Error("Failed to fetch imbuing item prices");
  }

  return assertZodParse(z.array(ImbuingItemSchema), data);
}
