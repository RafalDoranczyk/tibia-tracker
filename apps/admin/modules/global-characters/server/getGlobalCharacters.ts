import { AdminGlobalCharactersRepo } from "@repo/database/global-characters/admin";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { createServerSupabase } from "@/core/supabase";

export async function getGlobalCharacters() {
  const supabase = await createServerSupabase();

  try {
    const data = await AdminGlobalCharactersRepo.getAll(supabase);

    return data;
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch global characters");
  }
}
