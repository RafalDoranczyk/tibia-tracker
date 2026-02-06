"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils";

import { CharacterCharmUpsertPayloadSchema } from "../schemas";

export async function setCharacterCharmLevel(payload: unknown): Promise<void> {
  const { character_id, charm_id, level } = assertZodParse(
    CharacterCharmUpsertPayloadSchema,
    payload
  );

  const { supabase } = await requireAuthenticatedSupabase();

  // Call RPC (DB does ALL economy validation)
  const { error } = await supabase.rpc("unlock_charm", {
    p_character_id: character_id,
    p_charm_id: charm_id,
    p_level: level,
  });

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to set character charm level");
  }

  revalidatePath(PATHS.CHARACTER(character_id).CHARMS);
}
