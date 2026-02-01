"use server";

import { revalidatePath } from "next/cache";

import { getUserScopedQuery } from "@/core/supabase";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils";

import { DeleteCharacterSchema } from "../schemas";

export async function deleteCharacter(id: unknown): Promise<void> {
  const parsed = assertZodParse(DeleteCharacterSchema, id);

  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase.from("characters").delete().eq("id", parsed.id);

  if (error) {
    throw new Error("Failed deleting character");
  }

  revalidatePath(PATHS.CHARACTERS);
}
