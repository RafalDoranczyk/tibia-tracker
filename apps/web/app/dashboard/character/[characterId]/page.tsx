import { Box, Grid, Typography } from "@mui/material";
import type { Metadata } from "next";
import { EmptyState } from "@/components";
import { PageHeader } from "@/layout/page/PageHeader";
import {
  CharacterExpChart,
  CharacterExpHistoryTable,
  CharacterSyncButton,
  LevelUpPrediction,
} from "@/modules/character";
import { loadCharacterDashboardData } from "@/modules/character/server";
import { isCharacterSyncAllowed } from "@/modules/character/utils/isCharacterSyncAllowed";
import type { CharacterPageProps } from "../../types";

export const metadata: Metadata = {
  title: "Your Character Dashboard",
  description: "Detailed analytics of your character's experience and progression.",
};

export default async function DashboardPage({ params }: CharacterPageProps) {
  const { characterId } = await params;

  const { chartData, charWithGlobal, logs } = await loadCharacterDashboardData(characterId);

  const lastEntryDate = logs[0]?.recorded_at;
  const isSyncAllowed = lastEntryDate ? isCharacterSyncAllowed(new Date(lastEntryDate)) : true;

  return (
    <>
      <PageHeader
        title={charWithGlobal.name}
        action={
          <CharacterSyncButton
            globalCharacterId={charWithGlobal.global_character_id}
            name={charWithGlobal.name}
            world={charWithGlobal.global.world}
            vocation={charWithGlobal.global.vocation}
            isSyncAllowed={isSyncAllowed}
          />
        }
      />

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        {/* Main Chart Section */}
        <Grid size={{ xs: 12, xl: 8 }} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Experience Over Time
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analyze your daily experience gains and overall progression trends from the last 30
              days.
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: "flex" }}>
            <CharacterExpChart
              {...chartData}
              maxRecordDate={charWithGlobal?.global?.peak_recorded_at ?? null}
              maxRecordExp={charWithGlobal?.global?.peak_experience ?? null}
            />
          </Box>
        </Grid>

        {/* Prediction Sidebar */}
        <Grid size={{ xs: 12, xl: 4 }} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Progression Forecast
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estimations based on your recent activity.
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: "flex" }}>
            <LevelUpPrediction
              currentLevel={chartData.summary.lastLevel}
              currentExp={chartData.summary.currentExp}
              averageDailyGain={chartData.summary.averageGain}
            />
          </Box>
        </Grid>

        {/* History Table Section */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Detailed Logs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A day-by-day breakdown of your levels, experience gains, and ranking changes.
            </Typography>
          </Box>
          {logs.length === 0 ? (
            <EmptyState
              title="No experience logs available"
              subtitle="You haven't gained any experience in the last 30 days."
            />
          ) : (
            <CharacterExpHistoryTable logs={logs} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
