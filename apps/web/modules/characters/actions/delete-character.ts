"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { PATHS } from "@/core/paths";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { CharacterIDSchema } from "../schemas";
import { dbDeleteCharacter } from "../server";

export async function deleteCharacter(payload: unknown): Promise<void> {
  const id = assertZodParse(CharacterIDSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await dbDeleteCharacter(supabase, id);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to delete character");
  }

  revalidatePath(PATHS.CHARACTERS);
}
