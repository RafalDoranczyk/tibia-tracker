"use server";

import { z } from "zod";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type ImbuingItem, ImbuingItemSchema } from "../schemas/imbuing.schema";

const SELECT = Object.keys(ImbuingItemSchema.shape).join(", ");

export async function fetchImbuingItemPrices(): Promise<ImbuingItem[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase.from("imbuing_prices").select(SELECT).order("key");

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch imbuing item prices");
  }

  return assertZodParse(z.array(ImbuingItemSchema), data);
}
