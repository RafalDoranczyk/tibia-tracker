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
import type { CharacterPageProps } from "../../types";

export const metadata: Metadata = {
  title: "Your Character Dashboard",
  description: "Detailed analytics of your character's experience and progression.",
};

export default async function DashboardPage({ params }: CharacterPageProps) {
  const { characterId } = await params;

  const { chartPoints, summary, charWithGlobal, logs, canSync } =
    await loadCharacterDashboardData(characterId);

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
            canSync={canSync}
          />
        }
      />

      <Grid container spacing={2}>
        {/* Main Chart Section */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Experience Over Time
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analyze your daily experience gains and overall progression trends from the last 30
              days.
            </Typography>
          </Box>
          <CharacterExpChart chartPoints={chartPoints} summary={summary} />
        </Grid>

        {/* Prediction Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Progression Forecast
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estimations based on your recent activity.
            </Typography>
          </Box>
          <LevelUpPrediction
            currentLevel={summary.lastLevel}
            currentExp={summary.currentExp}
            averageDailyGain={summary.averageGain}
          />
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
