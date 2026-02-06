"use server";

import { cache } from "react";
import { z } from "zod";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type Item, ItemSchema } from "../schemas/item.schema";

const SELECT = Object.keys(ItemSchema.shape).join(", ");

async function fetchItemsInternal(): Promise<Item[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("items")
    .select(SELECT)
    .order("name", { ascending: true });

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch items");
  }

  return assertZodParse(z.array(ItemSchema), data);
}

export const fetchItems = cache(fetchItemsInternal);
