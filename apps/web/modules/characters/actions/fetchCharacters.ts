"use server";

import { z } from "zod";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type Character, CharacterSchema } from "../schemas";

const columns = CharacterSchema.keyof().options.join(", ");

export async function fetchCharacters(): Promise<Character[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("characters").select(columns);

  if (error) {
    throw new Error("Fetching characters failed");
  }

  return assertZodParse(z.array(CharacterSchema), data);
}
