"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { SupplyItemSchema } from "../schemas";

export async function fetchSupplies() {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("supplies")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);

  return assertZodParse(SupplyItemSchema.array(), data ?? []);
}
