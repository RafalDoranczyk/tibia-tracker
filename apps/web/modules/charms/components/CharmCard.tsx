"use client";

import { Box, Button, Card, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";

import type { CharmWithStatus } from "../schemas";

type CharmCardProps = {
  charm: CharmWithStatus;
  onUnlock: () => void;
  onRemove: () => void;
};

export function CharmCard({ charm, onUnlock, onRemove }: CharmCardProps) {
  const {
    name,
    unlocked,
    level,
    cost_lvl1,
    cost_lvl2,
    cost_lvl3,
    image_url,
    effect_lvl1,
    effect_lvl2,
    effect_lvl3,
  } = charm;

  const maxLevel = 3;
  const canUpgrade = unlocked && level < maxLevel;

  const currentEffect =
    level === 1 ? effect_lvl1 : level === 2 ? effect_lvl2 : level === 3 ? effect_lvl3 : null;

  const nextCost = !unlocked ? cost_lvl1 : level === 1 ? cost_lvl2 : level === 2 ? cost_lvl3 : null;

  return (
    <>
      <Card
        sx={{
          width: 160,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 1,
          boxShadow: unlocked ? 3 : 1,
          opacity: unlocked ? 1 : 0.6,
        }}
      >
        <CardMedia
          component="img"
          height="40"
          image={image_url}
          alt={name}
          sx={{ objectFit: "contain", width: "auto", mb: 1 }}
        />

        <CardContent sx={{ p: 1, flexGrow: 1, textAlign: "center", width: "100%" }}>
          <Typography variant="subtitle2">{name}</Typography>

          {unlocked && (
            <Chip label={`Lvl ${level}`} size="small" color="success" variant="outlined" />
          )}

          <Typography variant="caption" sx={{ mt: 1, display: "block" }} color="text.secondary">
            {unlocked ? `Effect: ${currentEffect}` : `Unlock cost: ${nextCost} points`}
          </Typography>
        </CardContent>

        <Box
          sx={{ width: "100%", px: 1, pb: 1, display: "flex", flexDirection: "column", gap: 0.5 }}
        >
          {!unlocked && (
            <Button onClick={onUnlock} fullWidth size="small" variant="outlined">
              Unlock
            </Button>
          )}

          {unlocked && (
            <Stack direction="column" spacing={1}>
              <Button fullWidth size="small" variant="contained" color="success">
                {canUpgrade ? `Upgrade (Lvl ${level + 1})` : "Max Level"}
              </Button>
              <Button onClick={onRemove} fullWidth size="small" variant="outlined" color="error">
                Remove
              </Button>
            </Stack>
          )}
        </Box>
      </Card>
    </>
  );
}
