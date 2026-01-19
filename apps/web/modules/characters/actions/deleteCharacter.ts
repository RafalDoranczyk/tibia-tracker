"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { deleteCharacterSchema } from "../schemas";
import type { DeleteCharacterPayload } from "../types";

export async function deleteCharacter(id: DeleteCharacterPayload) {
  const parsed = assertZodParse(deleteCharacterSchema, id);

  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase.from("characters").delete().eq("id", parsed.id);

  if (error) {
    throw new Error("Failed deleting character");
  }

  revalidatePath(PATHS.CHARACTERS);
}
