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
import { Overlay } from "./Overlay";

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
        <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
          {currentExp.toLocaleString()}
        </Typography>

        <Typography variant="caption">Target Level {nextLevel}:</Typography>
        <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
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
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Paper
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          pointerEvents: currentExp === 0 ? "none" : "auto",
          filter: currentExp === 0 ? "blur(2px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <Box sx={{ p: 3, flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                p: 0.8,
                borderRadius: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              }}
            >
              <UpgradeIcon />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Next Level
            </Typography>
          </Box>

          <Box
            sx={{
              mb: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Progress to {nextLevel}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, color: theme.palette.primary.main }}
            >
              {progress.toFixed(1)}%
            </Typography>
          </Box>

          <Tooltip title={tooltipContent} arrow>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  bgcolor: theme.palette.primary.main,
                },
              }}
            />
          </Tooltip>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 600, textTransform: "uppercase" }}
              >
                Remaining
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 800, color: theme.palette.warning.main }}
              >
                {expMissing.toLocaleString()} <small style={{ fontWeight: 400 }}>exp</small>
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 600, textTransform: "uppercase" }}
              >
                ETA
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 800 }}>
                {daysToLevel
                  ? new Date(Date.now() + daysToLevel * 86400000).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                    })
                  : "N/A"}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 4, display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: theme.palette.text.primary, lineHeight: 1 }}
            >
              {daysToLevel ?? "—"}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontWeight: 800, textTransform: "uppercase" }}
            >
              {daysToLevel === 1 ? "Day" : "Days"} to go
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 3, bgcolor: alpha(theme.palette.secondary.main, 0.02) }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <FlagIcon sx={{ color: theme.palette.secondary.main }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Goal Setter
            </Typography>
          </Box>

          <TextField
            fullWidth
            type="number"
            size="small"
            value={customGoal}
            onChange={(e) => setCustomGoal(Math.abs(Number(e.target.value)))}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 800, color: theme.palette.secondary.main }}
                    >
                      LVL
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontWeight: 700,
                bgcolor: theme.palette.background.paper,
              },
            }}
          />

          {customGoalData && customGoal > currentLevel ? (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.secondary.main,
                  textTransform: "uppercase",
                }}
              >
                Reach level {customGoal} in:
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, color: theme.palette.secondary.main, my: 0.5 }}
              >
                {customGoalData.days ? `~ ${customGoalData.days} days` : "—"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Requires <strong>{customGoalData.needed.toLocaleString()}</strong> more exp
              </Typography>
            </Box>
          ) : (
            <Typography variant="caption" color="error" sx={{ fontWeight: 600 }}>
              {customGoal <= currentLevel
                ? `Enter level > ${currentLevel}`
                : "Enter a valid target"}
            </Typography>
          )}
        </Box>
      </Paper>

      {currentExp === 0 && <Overlay />}
    </Box>
  );
}
