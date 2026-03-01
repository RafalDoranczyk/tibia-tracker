import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { type HuntSpotAnalytics, HuntSpotAnalyticsSchema } from "../../schemas";
import { dbGetHuntSpotsAnalytics } from "../queries/hunt-spots-analytics";

export async function getHuntSpotsAnalytics(characterId: string): Promise<HuntSpotAnalytics[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetHuntSpotsAnalytics(supabase, characterId);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt spots");
  }

  return assertZodParse(HuntSpotAnalyticsSchema.array(), data);
}
