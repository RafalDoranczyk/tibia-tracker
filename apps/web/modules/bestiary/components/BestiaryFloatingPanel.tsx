"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Drawer,
  Fab,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import type { CharacterBestiaryClassSummary, CharacterBestiarySummary } from "../types";

type BestiaryFloatingPanelProps = {
  globalSummary: CharacterBestiarySummary;
  classSummary: CharacterBestiaryClassSummary | null;
};

export function BestiaryFloatingPanel({ globalSummary, classSummary }: BestiaryFloatingPanelProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const charmPercent =
    globalSummary.total_charm_points > 0
      ? (globalSummary.unlocked_charm_points / globalSummary.total_charm_points) * 100
      : 0;

  return (
    <>
      {/* Floating FAB */}
      <Fab
        size="medium"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          right: 24,
          bottom: 40,
          zIndex: 50,
          background: "linear-gradient(135deg, #3b82f6, #2563eb)",
          color: "white",
          boxShadow: "0 0 15px rgba(0,0,0,0.5)",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 0 20px rgba(59,130,246,0.6)",
          },
          transition: "all 0.2s ease",
        }}
      >
        📊
      </Fab>

      {/* Drawer panel */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: isMobile ? "100%" : 380,
              background: "rgba(24,24,27,0.95)",
              backdropFilter: "blur(12px)",
              color: "white",
              p: 3,
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            📊 Bestiary Overview
          </Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Global summary */}
        <Box
          sx={{
            background: "linear-gradient(90deg, #1a1a1a, #292929)",
            borderRadius: 3,
            p: 2.5,
            mb: 3,
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            📘 Global Summary
          </Typography>

          <Stack spacing={2}>
            {/* Charm Points */}
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Unlocked Charm Points</Typography>
                <Typography fontWeight="bold" variant="body2">
                  {globalSummary.unlocked_charm_points} / {globalSummary.total_charm_points}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={charmPercent}
                sx={{
                  height: 10,
                  borderRadius: 2,
                  "& .MuiLinearProgress-bar": { backgroundColor: "#60a5fa" },
                }}
              />
            </Stack>

            {/* Soulpits */}
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Completed Soulpits</Typography>
                <Typography fontWeight="bold" variant="body2">
                  {globalSummary.completed_soulpits}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(globalSummary.completed_soulpits / 500) * 100}
                sx={{
                  height: 10,
                  borderRadius: 2,
                  "& .MuiLinearProgress-bar": { backgroundColor: "#f5b342" },
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {!classSummary ? (
          <Box
            sx={{
              background: "linear-gradient(90deg, #1c1c1c, #2a2a2a)",
              borderRadius: 3,
              p: 2.5,
              textAlign: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <Typography variant="body2" color="gray">
              🔎 Searching across all classes — class summary hidden
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              background: "linear-gradient(90deg, #1c1c1c, #2a2a2a)",
              borderRadius: 3,
              p: 2.5,
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              🧾 {classSummary.bestiary_class} Progress
            </Typography>

            <Stack spacing={2}>
              {/* Completed entries */}
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Completed Entries</Typography>
                  <Typography fontWeight="bold" variant="body2">
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
                    height: 10,
                    borderRadius: 2,
                    "& .MuiLinearProgress-bar": { backgroundColor: "#4ade80" },
                  }}
                />
              </Stack>

              {/* Soulpits */}
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Unlocked Soulpits</Typography>
                  <Typography fontWeight="bold" variant="body2">
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
                    height: 10,
                    borderRadius: 2,
                    "& .MuiLinearProgress-bar": { backgroundColor: "#f5b342" },
                  }}
                />
              </Stack>

              {/* Charm Points */}
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Charm Points</Typography>
                  <Typography fontWeight="bold" variant="body2">
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
                    height: 10,
                    borderRadius: 2,
                    "& .MuiLinearProgress-bar": { backgroundColor: "#60a5fa" },
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        )}
      </Drawer>
    </>
  );
}
