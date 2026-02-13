"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { PATHS } from "@/core/paths";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { CharacterCharmUpsertPayloadSchema } from "../schemas";
import { dbSetCharacterCharmLevel } from "../server";

export async function setCharacterCharmLevel(payload: unknown): Promise<void> {
  const { character_id, charm_id, level } = assertZodParse(
    CharacterCharmUpsertPayloadSchema,
    payload
  );

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await dbSetCharacterCharmLevel(supabase, character_id, charm_id, level);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to set character charm level");
  }

  revalidatePath(PATHS.CHARACTER(character_id).CHARMS);
}
