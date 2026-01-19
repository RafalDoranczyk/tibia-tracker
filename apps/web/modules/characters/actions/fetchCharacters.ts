"use server";

import { z } from "zod";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { characterSchema } from "../schemas";
import type { Character } from "../types";

export async function fetchCharacters(): Promise<Character[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("characters").select("id, name, vocation, world");

  if (error) {
    throw new Error("Fetching characters failed");
  }

  return assertZodParse(z.array(characterSchema), data);
}
