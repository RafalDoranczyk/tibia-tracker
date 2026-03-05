"use server";

import { CharacterIDSchema, CharactersRepo } from "@repo/database/characters";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { UserCache } from "@/modules/user";
import { CharactersCache } from "../cache";

export async function deleteCharacter(payload: unknown): Promise<void> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const { supabase, user } = await requireAuthenticatedSupabase();
  const { error } = await CharactersRepo.delete(supabase, { userId: user.id, characterId });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to delete character");
  }

  // We have to update user cache to remove the reference to the deleted character in the last active character setting
  updateTag(UserCache.settings(user.id));
  updateTag(CharactersCache.characterList(user.id));
}
