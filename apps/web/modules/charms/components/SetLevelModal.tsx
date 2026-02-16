import { Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { ConfirmDialog } from "@/components";

import { CHARM_LEVELS, type CharacterCharmWithProgress, type CharmLevel } from "../schemas";
import { getCharmEffectAtLevel, getCharmTotalCostToLevel } from "../utils/getCharmEconomy";

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

  const levels = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => {
      const level = (i + 1) as CharmLevel;
      const totalCost = getCharmTotalCostToLevel(charm, level);

      const currentTotalPaid = getCharmTotalCostToLevel(charm, currentLevel as CharmLevel);
      const upgradeCost = Math.max(0, totalCost - currentTotalPaid);

      return {
        level,
        totalCost,
        upgradeCost,
        effect: getCharmEffectAtLevel(charm, level),
        unlocked: level <= currentLevel,
        current: level === currentLevel,
        affordable: availablePoints >= upgradeCost,
      };
    });
  }, [charm, currentLevel, availablePoints]);

  const isUpgrade = charm.progress.unlocked;

  return (
    <ConfirmDialog.Root open onOpenChange={(s) => !s && onClose()}>
      <ConfirmDialog.Header
        title={`${isUpgrade ? "Upgrade" : "Unlock"} ${charm.name}`}
        description="Select the level you want to set for this charm."
      />

      <ConfirmDialog.Content>
        <Stack spacing={1.5}>
          {levels.map(
            ({ level, totalCost, upgradeCost, effect, unlocked, current, affordable }) => {
              const isDowngrade = level <= currentLevel;
              const disabled = isDowngrade || !affordable;
              const selected = level === selectedLevel;

              return (
                <Card
                  key={level}
                  variant="outlined"
                  sx={{
                    borderColor: selected ? "success.main" : "divider",
                    bgcolor: selected ? "rgba(0,255,120,0.08)" : undefined,
                    opacity: unlocked ? 0.65 : affordable ? 1 : 0.6,
                    transition: "all 0.2s",
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

                        <Stack direction="row" spacing={2} alignItems="center">
                          {current && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: "info.main",
                                fontWeight: 700,
                                textTransform: "uppercase",
                              }}
                            >
                              Current
                            </Typography>
                          )}

                          {/* Sekcja ceny / brakujących punktów */}
                          <Box sx={{ textAlign: "right" }}>
                            {!unlocked && (
                              <>
                                {affordable ? (
                                  <Typography fontWeight={700} color="success.main">
                                    {upgradeCost > 0 ? `+${upgradeCost} pts` : "Free"}
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: "error.main",
                                      fontWeight: 700,
                                      display: "block",
                                    }}
                                  >
                                    Need {upgradeCost - availablePoints} pts
                                  </Typography>
                                )}

                                {/* Subtelna informacja o koszcie całkowitym dla jasności */}
                                <Typography
                                  variant="caption"
                                  color="text.disabled"
                                  sx={{ display: "block" }}
                                >
                                  Total: {totalCost}
                                </Typography>
                              </>
                            )}

                            {unlocked && !current && (
                              <Typography variant="caption" color="text.disabled">
                                Owned
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            }
          )}
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
