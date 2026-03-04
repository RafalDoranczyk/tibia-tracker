import {
  dbGetHuntSpotsAnalyticsRPC,
  type HuntSpotAnalytics,
  HuntSpotAnalyticsSchema,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";

export async function getHuntSpotsAnalytics(characterId: string): Promise<HuntSpotAnalytics[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetHuntSpotsAnalyticsRPC({ supabase, characterId });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt spots");
  }

  return assertZodParse(HuntSpotAnalyticsSchema.array(), data);
}
