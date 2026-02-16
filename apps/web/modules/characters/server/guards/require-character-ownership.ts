import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { dbVerifyCharacterOwnership } from "../../../bestiary/server/queries/ownership";

export async function requireCharacterOwnership(characterId: string) {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await dbVerifyCharacterOwnership(supabase, user.id, characterId);

  if (error || !data) {
    throwAndLogError(
      error,
      AppErrorCode.UNAUTHORIZED,
      "Access Denied: You do not own this character"
    );
  }

  return true;
}
