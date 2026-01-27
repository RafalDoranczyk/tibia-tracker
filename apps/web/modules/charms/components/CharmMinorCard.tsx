"use client";

import { Button, Stack, Typography } from "@mui/material";

import { CHARM_MAX_LEVEL } from "../constants";
import type { CharmWithProgress } from "../types";
import { canAffordNextCharmLevel, getCharmNextLevelCost } from "../utils/getCharmEconomy";
import { CharmCardLayout } from "./CharmCardLayout";

type CharmMinorCardProps = {
  charm: CharmWithProgress;
  availableMinorPoints: number;
  onSelect: () => void;
};

export function CharmMinorCard({ charm, availableMinorPoints, onSelect }: CharmMinorCardProps) {
  const { name, description, image_url, progress } = charm;
  const { unlocked, level } = progress;

  const isMaxLevel = unlocked && level >= CHARM_MAX_LEVEL;

  const nextCost = getCharmNextLevelCost(charm);
  const canAfford = canAffordNextCharmLevel(charm, availableMinorPoints);

  let buttonLabel = "Max Level";
  let buttonDisabled = true;

  if (!isMaxLevel) {
    if (!canAfford && nextCost !== null) {
      const missing = Math.max(0, nextCost - availableMinorPoints);
      buttonLabel = `Need ${missing} pts`;
    } else {
      buttonLabel = unlocked ? "Change Level" : "Unlock";
      buttonDisabled = false;
    }
  }

  return (
    <CharmCardLayout
      name={name}
      description={description}
      imageUrl={image_url}
      unlocked={unlocked}
      level={unlocked ? level : undefined}
    >
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          {isMaxLevel
            ? "Max level reached"
            : nextCost !== null
              ? `Next cost: ${nextCost} points`
              : "—"}
        </Typography>

        <Button
          fullWidth
          size="small"
          variant="contained"
          color="secondary"
          disabled={buttonDisabled}
          onClick={onSelect}
        >
          {buttonLabel}
        </Button>
      </Stack>
    </CharmCardLayout>
  );
}
