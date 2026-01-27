"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { mapCharmRowToCharm } from "../mappers/mapCharmRowToCharm";
import { CharmRowSchema } from "../schemas";
import type { Charm } from "../types";

const charmKeys = CharmRowSchema.keyof().options.join(",");

export async function fetchCharms(): Promise<Charm[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("charms").select(charmKeys);

  if (error) {
    throw new Error("Failed to fetch charms");
  }

  const rows = assertZodParse(CharmRowSchema.array(), data);

  return rows.map(mapCharmRowToCharm);
}
