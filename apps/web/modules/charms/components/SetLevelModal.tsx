import { Badge, Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { ConfirmDialog } from "@/components";

import { type CharacterCharmWithProgress, CHARM_LEVELS, type CharmLevel } from "../schemas";
import {
  canAffordCharmLevel,
  getCharmEffectAtLevel,
  getCharmTotalCostToLevel,
} from "../utils/getCharmEconomy";

type SetLevelModalProps = {
  isPending: boolean;
  charm: CharacterCharmWithProgress;
  availablePoints: number;
  onClose: () => void;
  onConfirm: (level: CharmLevel) => void;
};

export function SetLevelModal({
  onClose,
  charm,
  onConfirm,
  isPending,
  availablePoints,
}: SetLevelModalProps) {
  const currentLevel = charm.progress.level;
  const initialLevel = (
    charm.progress.unlocked
      ? Math.min(currentLevel + 1, CHARM_LEVELS[CHARM_LEVELS.length - 1])
      : CHARM_LEVELS[0]
  ) as CharmLevel;

  const [selectedLevel, setSelectedLevel] = useState<CharmLevel>(initialLevel);

  const levels = useMemo(
    () =>
      Array.from({ length: CHARM_LEVELS.length }, (_, i) => {
        const level = CHARM_LEVELS[i];
        const cost = getCharmTotalCostToLevel(charm, level);
        return {
          level,
          cost,
          effect: getCharmEffectAtLevel(charm, level),
          unlocked: charm.progress.unlocked && level <= currentLevel,
          current: level === currentLevel,
          affordable: canAffordCharmLevel(charm, level, availablePoints),
        };
      }),
    [charm, currentLevel, availablePoints]
  );

  const isUpgrade = charm.progress.unlocked;

  return (
    <ConfirmDialog.Root open onOpenChange={(s) => !s && onClose()}>
      <ConfirmDialog.Header
        title={`${isUpgrade ? "Upgrade" : "Unlock"} ${charm.name}`}
        description="Select the level you want to set for this charm."
      />

      <ConfirmDialog.Content>
        <Stack spacing={1.5}>
          {levels.map(({ level, cost, effect, unlocked, current, affordable }) => {
            const isDowngrade = charm.progress.unlocked && level <= currentLevel;
            const disabled = isDowngrade || !affordable;
            const selected = level === selectedLevel;

            return (
              <Card
                key={level}
                variant="outlined"
                sx={{
                  borderColor: selected ? "success.main" : "divider",
                  bgcolor: selected ? "rgba(0,255,120,0.08)" : undefined,
                  opacity: disabled ? 0.45 : unlocked ? 0.65 : 1,
                }}
              >
                <CardActionArea disabled={disabled} onClick={() => setSelectedLevel(level)}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography fontWeight={600}>Level {level}</Typography>

                        {effect && (
                          <Typography variant="caption" color="text.secondary">
                            {effect}
                          </Typography>
                        )}
                      </Box>

                      <Stack direction="row" spacing={1} alignItems="center">
                        {current && (
                          <Badge
                            badgeContent="Current"
                            color="info"
                            sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 50 } }}
                          />
                        )}

                        {!affordable && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: "error.main",
                              fontWeight: 600,
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              bgcolor: "rgba(255,0,0,0.12)",
                              border: "1px solid rgba(255,0,0,0.25)",
                            }}
                          >
                            Need {Math.max(0, cost - availablePoints)} pts
                          </Typography>
                        )}
                      </Stack>

                      <Typography fontWeight={600} color="success.main">
                        {cost} pts
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Stack>
      </ConfirmDialog.Content>

      <ConfirmDialog.Actions>
        <ConfirmDialog.Cancel loading={isPending} />
        <ConfirmDialog.Confirm
          loading={isPending}
          color="success"
          onClick={() => onConfirm(selectedLevel)}
        >
          {isUpgrade ? "Set to Level" : "Unlock Level"} {selectedLevel}
        </ConfirmDialog.Confirm>
      </ConfirmDialog.Actions>
    </ConfirmDialog.Root>
  );
}
