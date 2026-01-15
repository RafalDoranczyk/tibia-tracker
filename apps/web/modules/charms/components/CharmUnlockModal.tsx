"use client";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { ConfirmDialog } from "@/components";

import type { CharmWithStatus } from "../schemas";

type CharmUnlockModalProps = {
  open: boolean;
  onClose: () => void;
  charm: CharmWithStatus;
  onConfirm: (level: number) => void;
};

export function CharmUnlockModal({ open, onClose, charm, onConfirm }: CharmUnlockModalProps) {
  const [selectedLevel, setSelectedLevel] = useState(1);

  const levelOptions = [
    { level: 1, cost: charm.cost_lvl1, effect: charm.effect_lvl1 },
    { level: 2, cost: charm.cost_lvl2, effect: charm.effect_lvl2 },
    { level: 3, cost: charm.cost_lvl3, effect: charm.effect_lvl3 },
  ];

  return (
    <ConfirmDialog.Root open={open} onOpenChange={(state) => !state && onClose()}>
      <ConfirmDialog.Header
        title={`Unlock ${charm.name}`}
        description="Select the level you want to unlock and review its cost and effect."
      />

      <ConfirmDialog.Content>
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            Charm Level
          </FormLabel>
          <RadioGroup
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
          >
            {levelOptions.map(({ level, cost, effect }) => (
              <FormControlLabel
                key={level}
                value={level}
                control={<Radio />}
                label={
                  <Stack direction="column" spacing={0.3}>
                    <Typography variant="body2">Level {level}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Cost: {cost} points
                    </Typography>
                    {effect && (
                      <Typography variant="caption" color="success.main">
                        Effect: {effect}
                      </Typography>
                    )}
                  </Stack>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </ConfirmDialog.Content>

      <ConfirmDialog.Actions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="success" onClick={() => onConfirm(selectedLevel)}>
          Confirm
        </Button>
      </ConfirmDialog.Actions>
    </ConfirmDialog.Root>
  );
}
