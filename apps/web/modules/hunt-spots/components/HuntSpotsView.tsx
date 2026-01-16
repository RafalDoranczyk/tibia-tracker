"use client";

import Celebration from "@mui/icons-material/Celebration";
import FlashOn from "@mui/icons-material/FlashOn";
import LocalFireDepartment from "@mui/icons-material/LocalFireDepartment";
import { Box, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";

import { calculateXpMultiplier } from "../utils/xpMultiplier";
import { HuntCard } from "./HuntCard";

export type HuntStats = {
  session_ids: number[];
  place_name: string;
  avg_balance: number;
  avg_exp_per_hour: number;
  avg_supplies_per_hour: {
    item: string;
    supply_id: number;
    avg_amount_per_hour: number;
    image_url?: string;
  }[];
  avg_monsters_per_hour: {
    monster_id: number;
    monster_name: string;
    avg_count_per_hour: number;
    image_url?: string;
    exp: number;
  }[];
  received_damage: {
    damage_type_id: number;
    avg_percent: number;
    image_url?: string;
    damage_type_name: string;
  }[];
  received_damage_sources: {
    monster_id: number;
    avg_percent: number;
    image_url?: string;
  }[];
};

type HuntSpotsViewProps = {
  data: HuntStats[];
};

export function HuntSpotsView({ data }: HuntSpotsViewProps) {
  const [activeBoosts, setActiveBoosts] = useState<string[]>(["stamina"]);

  const handleBoostChange = (_: React.MouseEvent<HTMLElement>, newBoosts: string[]) => {
    setActiveBoosts(newBoosts);
  };

  const currentMultiplier = calculateXpMultiplier(activeBoosts);

  return (
    <Box sx={{ p: 2 }}>
      {/* Compact Experience Boosts */}
      <Paper
        sx={{
          borderRadius: 2,
          p: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          position: "sticky",
          top: 80,
          zIndex: 10,
        }}
      >
        <ToggleButtonGroup
          value={activeBoosts}
          onChange={handleBoostChange}
          size="small"
          color="secondary"
        >
          <ToggleButton color="success" value="stamina">
            <LocalFireDepartment />
            Green Stamina
          </ToggleButton>

          <ToggleButton value="boost">
            <FlashOn />
            XP Boost
          </ToggleButton>

          {/* ✅ Nowy button */}
          <ToggleButton value="double">
            <Celebration />
            Double XP Event
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography
          variant="body2"
          fontWeight={700}
          width={80}
          textAlign="center"
          sx={{
            py: 0.5,
            borderRadius: 1,
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
          }}
        >
          {currentMultiplier.toFixed(2)}x
        </Typography>
      </Paper>

      {/* Hunt Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {data.map((item) => (
          <Box
            key={item.place_name}
            sx={{
              width: "calc(50% - 8px)",
            }}
          >
            <HuntCard stats={item} activeBoosts={activeBoosts} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
