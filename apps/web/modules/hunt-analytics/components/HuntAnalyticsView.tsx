"use client";

import Cake from "@mui/icons-material/Cake";
import Celebration from "@mui/icons-material/Celebration";
import FlashOn from "@mui/icons-material/FlashOn";
import LocalFireDepartment from "@mui/icons-material/LocalFireDepartment";
import MapIcon from "@mui/icons-material/Map";
import {
  alpha,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useActiveCharacter } from "@/modules/characters";

import type { ActiveBoost, HuntSpotsAnalyticsUI } from "../types";
import { calculateXpMultiplier, getExpNextLevel } from "../utils";
import { PerformanceBadge } from "./PerformanceBadge";
import { SpotCard } from "./SpotCard";

export function HuntAnalyticsView({
  bestProfitSpot,
  bestXpSpot,
  remainingSpots,
}: HuntSpotsAnalyticsUI) {
  const { activeCharacter } = useActiveCharacter();

  const [activeBoosts, setActiveBoosts] = useState<ActiveBoost[]>(["stamina"]);
  const [percentToGo, setPercentToGo] = useState<number>(100);

  const xpToNextLevel = useMemo(() => {
    if (!activeCharacter) return 0;

    const totalExpForNextLevel = getExpNextLevel(activeCharacter.level);

    return Math.floor((percentToGo / 100) * totalExpForNextLevel);
  }, [activeCharacter, percentToGo]);

  const currentMultiplier = calculateXpMultiplier(activeBoosts);

  const cardProps = {
    currentMultiplier,
    xpToNextLevel,
  };

  return (
    <Container maxWidth="xxl">
      <Stack spacing={4}>
        <XpSimulatorBar
          activeBoosts={activeBoosts}
          setActiveBoosts={setActiveBoosts}
          currentMultiplier={currentMultiplier}
          percentToGo={percentToGo}
          setPercentToGo={setPercentToGo}
        />

        <Stack spacing={2}>
          <PerformanceBadge variant="bold" />
          <Divider />
          <Grid container spacing={2}>
            {[
              { stats: bestXpSpot, highlight: "xp" as const },
              { stats: bestProfitSpot, highlight: "profit" as const },
            ].map(({ stats, highlight }) => (
              <Grid key={stats.place_id} size={{ xs: 12, md: 6 }}>
                <SpotCard stats={stats} highlight={highlight} {...cardProps} />
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Stack spacing={2}>
          <PerformanceBadge
            variant="minimal"
            label={`Hunting Grounds (${remainingSpots.length})`}
            icon={<MapIcon />}
          />
          <Divider />
          <Grid container spacing={2}>
            {remainingSpots.map((stats) => (
              <Grid key={stats.place_id} size={{ xs: 12, sm: 6, xl: 4, xxl: 3 }}>
                <SpotCard stats={stats} {...cardProps} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
}

function XpSimulatorBar({
  activeBoosts,
  setActiveBoosts,
  currentMultiplier,
  percentToGo,
  setPercentToGo,
}: {
  activeBoosts: ActiveBoost[];
  currentMultiplier: number;
  setActiveBoosts: (boosts: ActiveBoost[]) => void;
  percentToGo: number;
  setPercentToGo: (val: number) => void;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        px: 3,
        position: "sticky",
        top: 16,
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="overline" fontWeight={900} color="textSecondary">
          XP Simulator
        </Typography>
        <ToggleButtonGroup
          value={activeBoosts}
          onChange={(_, b) => setActiveBoosts(b)}
          size="small"
          sx={{ "& .MuiToggleButton-root": { gap: 1 } }}
        >
          <ToggleButton color="success" value="stamina">
            <LocalFireDepartment fontSize="small" /> Stamina
          </ToggleButton>
          <ToggleButton color="info" value="boost">
            <FlashOn fontSize="small" /> Boost
          </ToggleButton>
          <ToggleButton color="secondary" value="double">
            <Celebration fontSize="small" /> Double
          </ToggleButton>

          <ToggleButton color="secondary" value="cake">
            <Cake fontSize="small" /> Cake Event
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
        <Typography variant="overline" fontWeight={900} color="textSecondary">
          PERCENT TO GO
        </Typography>
        <TextField
          size="small"
          type="number"
          sx={{ width: 120 }}
          value={percentToGo}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 100) setPercentToGo(val);
          }}
          slotProps={{
            input: {
              endAdornment: <Typography variant="body2">%</Typography>,
            },
          }}
        />
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          px: 2,
          py: 0.75,
          bgcolor: (t) => alpha(t.palette.secondary.main, 0.08),
          border: "1px solid",
          borderColor: (t) => alpha(t.palette.secondary.main, 0.2),
        }}
      >
        <Typography
          variant="overline"
          fontWeight={950}
          color="secondary.main"
          sx={{
            letterSpacing: 1.2,
            lineHeight: 1,
            opacity: 0.8,
          }}
        >
          EXP GAIN RATE
        </Typography>

        <Typography
          variant="h4"
          color="secondary.main"
          fontWeight={900}
          sx={{
            fontFamily: "monospace",
            lineHeight: 1,
            textShadow: (t) => `0 0 12px ${alpha(t.palette.secondary.main, 0.3)}`,
          }}
        >
          {Math.round(currentMultiplier * 100)}%
        </Typography>
      </Stack>
    </Paper>
  );
}
