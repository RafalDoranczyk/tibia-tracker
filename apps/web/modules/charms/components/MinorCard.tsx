"use client";

import { Button, Stack, Typography } from "@mui/material";

import { type CharacterCharmWithProgress, CHARM_LEVELS } from "../schemas";
import { canAffordNextCharmLevel, getCharmNextLevelCost } from "../utils/getCharmEconomy";
import { CardLayout } from "./CardLayout";

type MinorCardProps = {
  charm: CharacterCharmWithProgress;
  availableMinorPoints: number;
  onSelect: () => void;
};

export function MinorCard({ charm, availableMinorPoints, onSelect }: MinorCardProps) {
  const { name, description, image_path, progress } = charm;
  const { unlocked, level } = progress;

  const isMaxLevel = unlocked && level >= CHARM_LEVELS[CHARM_LEVELS.length - 1];

  const nextCost = getCharmNextLevelCost(charm);
  const canAfford = canAffordNextCharmLevel(charm, availableMinorPoints);

  let buttonLabel = "Max Level";
  let buttonDisabled = true;

  if (!isMaxLevel) {
    if (!canAfford && nextCost !== null) {
      const missing = Math.max(0, nextCost - availableMinorPoints);
      buttonLabel = `Need ${missing} pts`;
    } else {
      buttonLabel = unlocked ? "Upgrade" : "Unlock";
      buttonDisabled = false;
    }
  }

  return (
    <CardLayout
      name={name}
      description={description}
      imagePath={image_path}
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
    </CardLayout>
  );
}
