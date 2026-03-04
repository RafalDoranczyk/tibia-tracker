import { dbGetCharacterLast30DaysExp, dbGetCharacterWithGlobalInfo } from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { mapExpHistoryToChartData } from "../mappers/mapExpHistoryToChartData";
import { isCharacterSyncAllowed } from "../utils/isCharacterSyncAllowed";

export async function loadCharacterDashboardData(characterId: string) {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data: charWithGlobal, error } = await dbGetCharacterWithGlobalInfo({
    supabase,
    characterId,
  });

  if (error || !charWithGlobal) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to load character dashboard data");
  }

  const { data: logs, error: logsError } = await dbGetCharacterLast30DaysExp({
    supabase,
    globalCharacterId: charWithGlobal.global_character_id,
  });

  if (logsError) {
    throwAndLogError(
      logsError,
      AppErrorCode.SERVER_ERROR,
      "Failed to load character dashboard data"
    );
  }

  const { chartPoints, summary } = mapExpHistoryToChartData(logs);

  const lastEntryDate = logs?.[0].recorded_at ?? null;
  const canSync = isCharacterSyncAllowed(lastEntryDate ? new Date(lastEntryDate) : null);

  return {
    chartPoints,
    summary,
    charWithGlobal,
    logs,
    canSync,
  };
}
