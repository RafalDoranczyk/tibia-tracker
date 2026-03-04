"use client";

import FlagIcon from "@mui/icons-material/Flag";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import {
  alpha,
  Box,
  Divider,
  InputAdornment,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { calculateLevelProgress, getNeededExpForLevel } from "@repo/tibia-utils";
import { useMemo, useState } from "react";

type LevelUpPredictionProps = {
  currentLevel: number;
  currentExp: number;
  averageDailyGain: number;
};

export function LevelUpPrediction({
  currentLevel,
  currentExp,
  averageDailyGain,
}: LevelUpPredictionProps) {
  const theme = useTheme();
  const [customGoal, setCustomGoal] = useState<number>(currentLevel + 10);

  const { nextLevel, totalExpAtNextLevelStart, expMissing, progress, daysToLevel } =
    calculateLevelProgress(currentLevel, currentExp, averageDailyGain);

  const customGoalData = useMemo(() => {
    if (!customGoal || customGoal <= currentLevel) return null;

    const targetExp = getNeededExpForLevel(customGoal);
    const needed = Math.max(0, targetExp - currentExp);
    const days = averageDailyGain > 0 ? Math.ceil(needed / averageDailyGain) : null;

    return { needed, days };
  }, [customGoal, currentLevel, currentExp, averageDailyGain]);

  const tooltipContent = (
    <Box sx={{ p: 1 }}>
      <Typography variant="caption" sx={{ display: "block", fontWeight: "bold", mb: 0.5 }}>
        Experience Details:
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 2 }}>
        <Typography variant="caption">Current Total:</Typography>
        <Typography variant="caption" sx={{ fontWeight: "mono" }}>
          {currentExp.toLocaleString()}
        </Typography>

        <Typography variant="caption">Target Level {nextLevel}:</Typography>
        <Typography variant="caption" sx={{ fontWeight: "mono" }}>
          {totalExpAtNextLevelStart.toLocaleString()}
        </Typography>

        <Divider sx={{ gridColumn: "span 2", my: 0.5, borderColor: alpha("#fff", 0.1) }} />

        <Typography variant="caption" sx={{ fontWeight: "bold" }}>
          Remaining:
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontWeight: "bold", color: theme.palette.warning.light }}
        >
          {expMissing.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ position: "relative" }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.default,
          overflow: "hidden",
          // Blokujemy interakcje z formularzem, gdy nie ma danych
          pointerEvents: currentExp === 0 ? "none" : "auto",
          // Opcjonalne rozmycie treści pod spodem
          filter: currentExp === 0 ? "blur(2px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {/* SECTION 1: NEXT LEVEL */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <UpgradeIcon color="primary" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Next Level Prediction
            </Typography>
          </Box>

          <Box
            sx={{
              mb: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Progress to Level <strong>{nextLevel}</strong>
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
              {(100 - progress).toFixed(2)}% to go
            </Typography>
          </Box>

          <Tooltip title={tooltipContent} arrow>
            <LinearProgress
              variant="determinate"
              value={progress}
              aria-label="Level progress"
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: theme.palette.action.focus,
                "& .MuiLinearProgress-bar": {
                  borderRadius: 6,
                  backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                },
              }}
            />
          </Tooltip>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Remaining
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, color: theme.palette.warning.main }}
              >
                -{expMissing.toLocaleString()} exp
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Estimated Date
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {daysToLevel
                  ? new Date(Date.now() + daysToLevel * 86400000).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                    })
                  : "N/A"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3, display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: theme.palette.primary.main }}>
              {daysToLevel ?? "—"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 700 }}>
              {daysToLevel === 1 ? "DAY" : "DAYS"} TO GO
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed", borderColor: theme.palette.divider }} />

        {/* SECTION 2: GOAL SETTER */}
        <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <FlagIcon sx={{ color: theme.palette.secondary.main }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Goal Setter
            </Typography>
          </Box>

          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Target Level"
              type="number"
              variant="outlined"
              size="small"
              value={customGoal}
              onChange={(e) => setCustomGoal(Math.abs(Number(e.target.value)))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">Lvl</InputAdornment>,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                },
              }}
            />

            {customGoalData && customGoal > currentLevel ? (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                  background: alpha(theme.palette.secondary.main, 0.05),
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", fontWeight: 700 }}
                >
                  ETA for Level {customGoal}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 900, color: theme.palette.secondary.main, my: 0.5 }}
                >
                  {customGoalData.days ? `~ ${customGoalData.days} days` : "—"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Requires <strong>{customGoalData.needed.toLocaleString()}</strong> additional exp
                </Typography>
              </Box>
            ) : (
              <Typography variant="caption" color="error" sx={{ px: 1, fontWeight: 500 }}>
                {customGoal <= currentLevel
                  ? `Enter a level higher than ${currentLevel}`
                  : "Please enter a valid target level"}
              </Typography>
            )}
          </Stack>
        </Box>
      </Paper>

      {/* BLOCKED OVERLAY */}
      {currentExp === 0 && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.default, 0.4),
            backdropFilter: "blur(4px)",
            textAlign: "center",
            p: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
            Predictions Unavailable
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 220 }}>
            Set your current experience in the profile settings to unlock predictions.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
