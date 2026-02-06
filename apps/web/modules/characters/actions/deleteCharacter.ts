"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils";

import { DeleteCharacterSchema } from "../schemas";

export async function deleteCharacter(id: unknown): Promise<void> {
  const parsed = assertZodParse(DeleteCharacterSchema, id);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await supabase.from("characters").delete().eq("id", parsed.id);

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to delete character");
  }

  revalidatePath(PATHS.CHARACTERS);
}
