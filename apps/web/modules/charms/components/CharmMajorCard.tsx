import { Button, Stack, Typography } from "@mui/material";

import { CHARM_MAX_LEVEL } from "../constants";
import type { CharmWithProgress } from "../types";
import { canAffordNextCharmLevel, getCharmNextLevelCost } from "../utils/getCharmEconomy";
import { CharmCardLayout } from "./CharmCardLayout";

type CharmMajorCardProps = {
  charm: CharmWithProgress;
  availableMajorPoints: number;
  onSelect: () => void;
};

export function CharmMajorCard({ charm, availableMajorPoints, onSelect }: CharmMajorCardProps) {
  const { name, description, image_path, progress } = charm;
  const { unlocked, level } = progress;

  const isMaxLevel = unlocked && level >= CHARM_MAX_LEVEL;

  const nextCost = getCharmNextLevelCost(charm);
  const canAfford = canAffordNextCharmLevel(charm, availableMajorPoints);

  // ---- Button state ----
  let buttonLabel = "Max Level";
  let buttonDisabled = true;

  if (!isMaxLevel) {
    if (!canAfford && nextCost !== null) {
      const missing = Math.max(0, nextCost - availableMajorPoints);
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
      imagePath={image_path}
      unlocked={unlocked}
      level={unlocked ? level : undefined}
    >
      <Stack spacing={1}>
        {/* Cost preview */}
        <Typography variant="caption" color="text.secondary" textAlign="center">
          {isMaxLevel
            ? "Max level reached"
            : nextCost !== null
              ? `Next cost: ${nextCost} points`
              : "—"}
        </Typography>

        {/* Main action */}
        <Button
          fullWidth
          size="small"
          variant="contained"
          color={unlocked ? "primary" : "success"}
          disabled={buttonDisabled}
          onClick={onSelect}
        >
          {buttonLabel}
        </Button>
      </Stack>
    </CharmCardLayout>
  );
}
