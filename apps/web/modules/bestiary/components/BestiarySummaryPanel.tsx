"use client";

import AssessmentIcon from "@mui/icons-material/Assessment";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PublicIcon from "@mui/icons-material/Public";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Box, Button, Drawer, LinearProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import type { CharacterBestiaryClassSummary, CharacterBestiarySummary } from "../schemas";

type BestiarySummaryPanelProps = {
  globalSummary: CharacterBestiarySummary;
  classSummary: CharacterBestiaryClassSummary | null;
};

export function BestiarySummaryPanel({ globalSummary, classSummary }: BestiarySummaryPanelProps) {
  const [open, setOpen] = useState(false);

  const charmPercent =
    globalSummary.total_charm_points > 0
      ? (globalSummary.unlocked_charm_points / globalSummary.total_charm_points) * 100
      : 0;

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        color="secondary"
        startIcon={<AssessmentIcon />}
      >
        Summary Panel
      </Button>

      {/* Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <AssessmentIcon fontSize="small" />
            Bestiary Overview
          </Typography>
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
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            display="flex"
            alignItems="center"
            gap={1}
          >
            <PublicIcon fontSize="small" />
            Global Summary
          </Typography>

          <Stack spacing={2}>
            {/* Charm Points */}
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={1}>
                  <AutoAwesomeIcon fontSize="small" />
                  <Typography variant="body2">Unlocked Charm Points</Typography>
                </Stack>

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
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#60a5fa",
                  },
                }}
              />
            </Stack>

            {/* Soulpits */}
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={1}>
                  <WhatshotIcon fontSize="small" />
                  <Typography variant="body2">Completed Soulpits</Typography>
                </Stack>

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
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f5b342",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Class summary */}
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
            <Typography
              variant="body2"
              color="gray"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <ManageSearchIcon fontSize="small" />
              Searching across all classes — class summary hidden
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
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              display="flex"
              alignItems="center"
              gap={1}
            >
              <FactCheckIcon fontSize="small" />
              {classSummary.bestiary_class} Progress
            </Typography>

            <Stack spacing={2}>
              {/* Completed entries */}
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <ChecklistIcon fontSize="small" />
                    <Typography variant="body2">Completed Entries</Typography>
                  </Stack>

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
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#4ade80",
                    },
                  }}
                />
              </Stack>

              {/* Soulpits */}
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <WhatshotIcon fontSize="small" />
                    <Typography variant="body2">Unlocked Soulpits</Typography>
                  </Stack>

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
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#f5b342",
                    },
                  }}
                />
              </Stack>

              {/* Charm Points */}
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <AutoAwesomeIcon fontSize="small" />
                    <Typography variant="body2">Charm Points</Typography>
                  </Stack>

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
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#60a5fa",
                    },
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
