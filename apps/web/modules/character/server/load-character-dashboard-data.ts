import { ExperienceLogRepo } from "@repo/database/experience-log";
import { GlobalCharactersRepo } from "@repo/database/global-characters";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { mapExpHistoryToChartData } from "../mappers/mapExpHistoryToChartData";

export async function loadCharacterDashboardData(characterId: string) {
  const { supabase } = await requireAuthenticatedSupabase();

  // 1. Fetch character info with global ID (needed for subsequent queries)
  const { data: charWithGlobal, error: charError } = await GlobalCharactersRepo.getWithInfo(
    supabase,
    characterId
  );

  if (charError || !charWithGlobal) {
    throwAndLogError(
      charError,
      AppErrorCode.SERVER_ERROR,
      "Failed to load character dashboard data"
    );
  }

  // 2. Fetch history
  const { data: logs, error: logsError } = await ExperienceLogRepo.getLast30Days(
    supabase,
    charWithGlobal.global_character_id
  );

  // 3. Handle errors
  if (logsError) {
    throwAndLogError(logsError, AppErrorCode.SERVER_ERROR, "Failed to load logs");
  }

  // 4. Map data for chart
  const chartData = mapExpHistoryToChartData(logs);

  return {
    chartData,
    charWithGlobal,
    logs: logs ?? [],
  };
}
