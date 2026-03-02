"use server";

import { updateTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { UserCache } from "@/modules/user";
import { CharactersCache } from "../cache/characters-cache";
import { CharacterIDSchema } from "../schemas";
import { dbDeleteCharacter } from "../server/mutations/characters";

export async function deleteCharacter(payload: unknown): Promise<void> {
  const id = assertZodParse(CharacterIDSchema, payload);

  const { supabase, user } = await requireAuthenticatedSupabase();

  const { error } = await dbDeleteCharacter(supabase, user.id, id);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to delete character");
  }

  // We have to update user cache to remove the reference to the deleted character in the last active character setting
  updateTag(UserCache.settings(user.id));
  updateTag(CharactersCache.characterList(user.id));
}
