import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { dbGetLatestExpLogDate } from "../queries/get-latest-exp-log-date";

export async function getLatestExpLogDate() {
  const { supabase } = await requireAuthenticatedSupabase();

  try {
    const data = await dbGetLatestExpLogDate(supabase);

    return data;
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch characters");
  }
}
