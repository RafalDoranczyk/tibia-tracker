import { CharactersRepo } from "@repo/database/characters";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";

export async function requireCharacterOwnership(characterId: string) {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await CharactersRepo.getById(supabase, { userId: user.id, characterId });

  if (error || !data) {
    throwAndLogError(
      error,
      AppErrorCode.UNAUTHORIZED,
      "Access Denied: You do not own this character"
    );
  }

  return {
    data,
    supabase,
  };
}
