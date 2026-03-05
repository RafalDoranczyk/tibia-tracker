"use server";

import { CharacterIDSchema } from "@repo/database/characters";
import { UserRepo } from "@repo/database/user";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { UserCache } from "../cache";

export async function updateLastActiveCharacter(payload: unknown): Promise<void> {
  const id = assertZodParse(CharacterIDSchema, payload);

  const { supabase, user } = await requireAuthenticatedSupabase();

  const { error } = await UserRepo.updateLastActiveCharacter(supabase, {
    userId: user.id,
    characterId: id,
  });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update last active character");
  }

  updateTag(UserCache.settings(user.id));
}
