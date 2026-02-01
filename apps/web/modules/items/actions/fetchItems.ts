"use server";

import { cache } from "react";
import { z } from "zod";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type Item, ItemSchema } from "../schemas";

const SELECT = Object.keys(ItemSchema.shape).join(", ");

async function fetchItemsInternal(): Promise<Item[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("items")
    .select(SELECT)
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch items");
  }

  return assertZodParse(z.array(ItemSchema), data);
}

export const fetchItems = cache(fetchItemsInternal);
