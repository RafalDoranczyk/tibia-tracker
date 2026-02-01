"use server";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { mapCharmRowToCharm } from "../mappers/mapCharmRowToCharm";
import { type Charm, CharmRowSchema } from "../schemas";

const SELECT = CharmRowSchema.keyof().options.join(",");

export async function fetchCharms(): Promise<Charm[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("charms").select(SELECT);

  if (error) {
    throw new Error("Failed to fetch charms");
  }

  const rows = assertZodParse(CharmRowSchema.array(), data);

  return rows.map(mapCharmRowToCharm);
}
