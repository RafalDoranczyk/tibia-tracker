"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { formatNumberCompact } from "@/utils";

import { calculateXpMultiplier } from "../utils/xpMultiplier";
import type { HuntStats } from "./HuntSpotsView";

function calculatePotentialPreyBonus(
  monsterExp: number,
  countPerHour: number,
  activeBoosts: string[]
) {
  const xpMultiplier = calculateXpMultiplier(activeBoosts);
  const preyMultiplier = 1.4;

  const baseExpWithBoosts = monsterExp * countPerHour * xpMultiplier;
  const expWithPrey = baseExpWithBoosts * preyMultiplier;

  return expWithPrey - baseExpWithBoosts;
}

type HuntCardProps = {
  stats: HuntStats;
  activeBoosts: string[];
};

function StatCard({
  image,
  icon,
  label,
  value,
}: {
  image?: string;
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}) {
  const dimensions = 30;
  const width = 80;

  return (
    <Paper
      sx={{
        p: 1,
        width,
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        textAlign: "center",
      }}
    >
      {(image || icon) && (
        <Box
          sx={{
            width: dimensions,
            height: dimensions,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: icon ? "primary.main" : "transparent",
            color: icon ? "white" : "inherit",
          }}
        >
          {icon ? (
            icon
          ) : (
            <Avatar
              src={image}
              variant="square"
              sx={{
                width: dimensions,
                height: dimensions,
                borderRadius: 1.5,
                "& img": {
                  objectFit: "contain",
                  padding: "2px",
                },
              }}
            />
          )}
        </Box>
      )}

      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Chip
        label={value}
        variant="outlined"
        sx={{
          height: 18,
        }}
      />
    </Paper>
  );
}

function Section({
  title,
  children,
  maxHeight = 210,
}: {
  title: string;
  children: React.ReactNode;
  maxHeight?: number;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          height: maxHeight,
          overflowY: "auto",
          pr: 1, // padding scrollbar
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export function HuntCard({ stats, activeBoosts }: HuntCardProps) {
  const isProfit = stats.avg_balance > 0;
  const [selectedPrey, setSelectedPrey] = useState<number[]>([]);

  const handlePreyChange = (_: React.MouseEvent<HTMLElement>, newPrey: number[]) => {
    setSelectedPrey(newPrey || []);
  };

  const calculateTotalExp = () => {
    const multiplier = calculateXpMultiplier(activeBoosts);

    let totalExp = 0;
    for (const monster of stats.avg_monsters_per_hour) {
      const isPrey = selectedPrey.includes(monster.monster_id);
      const monsterMultiplier = multiplier * (isPrey ? 1.4 : 1);
      totalExp += monster.exp * monster.avg_count_per_hour * monsterMultiplier;
    }
    return Math.round(totalExp);
  };

  return (
    <Card>
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        {/* Header */}
        <Box
          bgcolor="background.paper"
          sx={{
            borderRadius: 2,
            py: 1,
            px: 3,
            mb: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h5">
              {stats.place_name} / {stats.session_ids.length}
            </Typography>
            <Stack direction="row" spacing={2} ml="auto">
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" color={isProfit ? "success.main" : "error.main"}>
                  {formatNumberCompact(stats.avg_balance)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Profit/Loss
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ height: 40 }} />
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" color="primary.main">
                  {formatNumberCompact(stats.avg_exp_per_hour)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Raw Exp/Hour
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ height: 40 }} />
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" color="secondary.main">
                  {formatNumberCompact(calculateTotalExp())}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Exp/Hour
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Stack spacing={3}>
          <Section title="Prey Selection (Max 3)">
            <ToggleButtonGroup
              color="primary"
              size="small"
              value={selectedPrey}
              onChange={handlePreyChange}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                "& .MuiToggleButtonGroup-grouped": {
                  margin: 0,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 0,
                },
              }}
            >
              {stats.avg_monsters_per_hour
                .map(({ monster_id, image_url, monster_name, exp, avg_count_per_hour }) => {
                  const potentialBonus = calculatePotentialPreyBonus(
                    exp,
                    avg_count_per_hour,
                    activeBoosts
                  );
                  return {
                    monster_id,
                    image_url,
                    monster_name,
                    potentialBonus,
                    exp,
                    avg_count_per_hour,
                  };
                })
                .sort((a, b) => b.potentialBonus - a.potentialBonus)
                .map(({ monster_id, image_url, monster_name, potentialBonus }) => (
                  <ToggleButton
                    key={monster_id}
                    value={monster_id}
                    disabled={selectedPrey.length >= 3 && !selectedPrey.includes(monster_id)}
                    color="secondary"
                    sx={{
                      flex: "1 1 50%",
                      maxWidth: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    {image_url && (
                      <Avatar
                        src={image_url}
                        variant="square"
                        sx={{ width: 30, height: 30, "& img": { objectFit: "contain" } }}
                      />
                    )}
                    {monster_name}
                    <Chip
                      size="small"
                      label={`+${formatNumberCompact(Math.round(potentialBonus))}`}
                    />
                  </ToggleButton>
                ))}
            </ToggleButtonGroup>
          </Section>

          {stats.avg_supplies_per_hour.length > 0 && (
            <Section title="Used Supplies" maxHeight={130}>
              <Stack direction="row" flexWrap="wrap" gap={0.8}>
                {stats.avg_supplies_per_hour.map(
                  ({ item, image_url, avg_amount_per_hour, supply_id }) => (
                    <StatCard
                      key={supply_id}
                      image={image_url}
                      label={item}
                      value={avg_amount_per_hour}
                    />
                  )
                )}
              </Stack>
            </Section>
          )}

          {stats.received_damage.length > 0 && stats.avg_monsters_per_hour.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Show Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Damage Types */}
                <Section title="Damage Types Received">
                  <Stack direction="row" flexWrap="wrap" gap={0.8}>
                    {stats.received_damage.map(
                      ({ damage_type_id, image_url, avg_percent, damage_type_name }) => (
                        <StatCard
                          key={damage_type_id}
                          image={image_url}
                          label={damage_type_name}
                          value={`${avg_percent}%`}
                        />
                      )
                    )}
                  </Stack>
                </Section>

                {/* Damage from Monsters */}
                <Section title="Damage Received From Monsters" maxHeight={124}>
                  <Stack direction="row" flexWrap="wrap" gap={0.8}>
                    {stats.avg_monsters_per_hour
                      .map((monster) => {
                        const dmg = stats.received_damage_sources.find(
                          (d) => d.monster_id === monster.monster_id
                        );
                        return dmg?.avg_percent
                          ? { ...monster, avg_percent: dmg.avg_percent }
                          : null;
                      })
                      .filter((monster): monster is NonNullable<typeof monster> => Boolean(monster))
                      .sort((a, b) => (b && a ? b.avg_percent - a.avg_percent : 0))
                      .map((monster) => (
                        <StatCard
                          key={monster.monster_id}
                          image={monster.image_url}
                          label={monster.monster_name}
                          value={`${monster.avg_percent}%`}
                        />
                      ))}
                  </Stack>
                </Section>
              </AccordionDetails>
            </Accordion>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
