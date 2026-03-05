import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PublicIcon from "@mui/icons-material/Public";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import type { CharacterBestiaryClassSummary, CharacterBestiarySummary } from "@repo/database";

type BestiarySummaryPanelProps = {
  globalSummary: CharacterBestiarySummary;
  classSummary: CharacterBestiaryClassSummary | null;
};

export function BestiarySummaryPanel({ classSummary, globalSummary }: BestiarySummaryPanelProps) {
  const charmPercent =
    globalSummary.total_charm_points > 0
      ? (globalSummary.unlocked_charm_points / globalSummary.total_charm_points) * 100
      : 0;

  return (
    <Stack direction="column" spacing={2}>
      <Paper
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ mb: 2, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          <PublicIcon sx={{ fontSize: 18 }} />
          Global Summary
        </Typography>

        <Stack spacing={2.5}>
          <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
              <Stack direction="row" alignItems="center" gap={0.5}>
                <AutoAwesomeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  Charm Points
                </Typography>
              </Stack>
              <Typography fontWeight="bold" variant="caption">
                {globalSummary.unlocked_charm_points} / {globalSummary.total_charm_points}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={charmPercent}
              sx={{
                height: 6,
                borderRadius: 1,
                "& .MuiLinearProgress-bar": { backgroundColor: "#60a5fa" },
              }}
            />
          </Stack>

          <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
              <Stack direction="row" alignItems="center" gap={0.5}>
                <WhatshotIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  Completed Soulpits
                </Typography>
              </Stack>
              <Typography fontWeight="bold" variant="caption">
                {globalSummary.completed_soulpits}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={Math.min((globalSummary.completed_soulpits / 500) * 100, 100)}
              sx={{
                height: 6,
                borderRadius: 1,
                "& .MuiLinearProgress-bar": { backgroundColor: "#f5b342" },
              }}
            />
          </Stack>
        </Stack>
      </Paper>

      <Paper
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          minHeight: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: !classSummary ? "center" : "flex-start",
        }}
      >
        {!classSummary ? (
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <ManageSearchIcon sx={{ fontSize: 18, color: "text.disabled" }} />
            <Typography variant="caption" color="text.disabled" textAlign="center">
              Select a class to see progress
            </Typography>
          </Stack>
        ) : (
          <>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap={1}
              sx={{
                mb: 2,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              <FactCheckIcon sx={{ fontSize: 18 }} />
              {classSummary.monster_class}
            </Typography>

            <Stack spacing={2}>
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <ChecklistIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      Entries
                    </Typography>
                  </Stack>
                  <Typography fontWeight="bold" variant="caption">
                    {classSummary.completed_monsters} / {classSummary.total_monsters}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={
                    classSummary.total_monsters > 0
                      ? (classSummary.completed_monsters / classSummary.total_monsters) * 100
                      : 0
                  }
                  sx={{
                    height: 6,
                    borderRadius: 1,
                    "& .MuiLinearProgress-bar": { backgroundColor: "#4ade80" },
                  }}
                />
              </Stack>

              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <WhatshotIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      Soulpits
                    </Typography>
                  </Stack>
                  <Typography fontWeight="bold" variant="caption">
                    {classSummary.completed_soulpits} / {classSummary.total_monsters}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={
                    classSummary.total_monsters > 0
                      ? (classSummary.completed_soulpits / classSummary.total_monsters) * 100
                      : 0
                  }
                  sx={{
                    height: 6,
                    borderRadius: 1,
                    "& .MuiLinearProgress-bar": { backgroundColor: "#f5b342" },
                  }}
                />
              </Stack>

              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <AutoAwesomeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      Charm Points
                    </Typography>
                  </Stack>
                  <Typography fontWeight="bold" variant="caption">
                    {classSummary.unlocked_charm_points} / {classSummary.total_charm_points}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={
                    classSummary.total_charm_points > 0
                      ? (classSummary.unlocked_charm_points / classSummary.total_charm_points) * 100
                      : 0
                  }
                  sx={{
                    height: 6,
                    borderRadius: 1,
                    "& .MuiLinearProgress-bar": { backgroundColor: "#60a5fa" },
                  }}
                />
              </Stack>
            </Stack>
          </>
        )}
      </Paper>
    </Stack>
  );
}
