"use client";

import Celebration from "@mui/icons-material/Celebration";
import FlashOn from "@mui/icons-material/FlashOn";
import LocalFireDepartment from "@mui/icons-material/LocalFireDepartment";
import MapIcon from "@mui/icons-material/Map";
import {
  alpha,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useActiveCharacter } from "@/modules/characters";
import type { HuntSpot } from "../schemas";
import type { ActiveBoost } from "../types";
import { calculateXpMultiplier, getExpNextLevel, getPeakPerformance } from "../utils";
import { HuntCard } from "./HuntCard";
import { PerformanceBadge } from "./PerformanceBadge";

type HuntSpotsViewProps = {
  data: HuntSpot[];
};

export function HuntSpotsView({ data }: HuntSpotsViewProps) {
  const { activeCharacter } = useActiveCharacter();
  const [activeBoosts, setActiveBoosts] = useState<ActiveBoost[]>(["stamina"]);

  const performance = useMemo(() => getPeakPerformance(data), [data]);

  const xpToNextLevel = useMemo(
    () => (activeCharacter ? getExpNextLevel(activeCharacter.level) : 0),
    [activeCharacter]
  );

  const currentMultiplier = calculateXpMultiplier(activeBoosts);

  const { bestXp, bestProfit, remainingData } = performance;

  const cardProps = { currentMultiplier, xpToNextLevel };

  const leaders = [
    { stats: bestXp, highlight: "xp" as const },
    { stats: bestProfit, highlight: "profit" as const },
  ];

  return (
    <Container maxWidth="xxl">
      <Stack spacing={4}>
        <XpSimulatorBar activeBoosts={activeBoosts} setActiveBoosts={setActiveBoosts} />

        <Stack spacing={2}>
          <PerformanceBadge variant="bold" />
          <Divider />
          <Grid container spacing={2}>
            {leaders.map(({ stats, highlight }) => (
              <Grid key={stats.place_id} size={{ xs: 12, md: 6 }}>
                <HuntCard stats={stats} highlight={highlight} {...cardProps} />
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Stack spacing={2}>
          <PerformanceBadge
            variant="minimal"
            label={`Hunting Grounds (${remainingData.length})`}
            icon={<MapIcon />}
          />
          <Divider />
          <Grid container spacing={2}>
            {remainingData.map((stats) => (
              <Grid key={stats.place_id} size={{ xs: 12, sm: 6, xl: 4, xxl: 3 }}>
                <HuntCard stats={stats} {...cardProps} />
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
}: {
  activeBoosts: ActiveBoost[];
  setActiveBoosts: (boosts: ActiveBoost[]) => void;
}) {
  const currentMultiplier = calculateXpMultiplier(activeBoosts);
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        px: 3,
        position: "sticky",
        top: 16,
        zIndex: 1100,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(8px)",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: (t) => alpha(t.palette.background.paper, 0.8),
      }}
    >
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography variant="overline" fontWeight="bold" color="text.secondary">
          XP Simulator
        </Typography>
        <ToggleButtonGroup
          value={activeBoosts}
          onChange={(_, b) => setActiveBoosts(b)}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              gap: 1,
            },
          }}
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
        </ToggleButtonGroup>
      </Stack>

      <Stack direction="row" alignItems="baseline" spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Current Rate:
        </Typography>
        <Typography
          variant="h4"
          color="secondary"
          fontWeight={800}
          sx={{ fontFamily: "monospace" }}
        >
          {currentMultiplier * 100}%
        </Typography>
      </Stack>
    </Paper>
  );
}
