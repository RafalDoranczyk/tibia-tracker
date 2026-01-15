"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { type Charm, FetchCharmsResponseSchema } from "../schemas";

export async function fetchCharms(): Promise<Charm[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("charms").select("*");
  if (error) throw error;

  return assertZodParse(FetchCharmsResponseSchema, data);
}
