import GavelIcon from "@mui/icons-material/Gavel";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaidIcon from "@mui/icons-material/Paid";
import { Card, Checkbox, Chip, Divider, FormControlLabel, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

import { SKILL_WEAPON_TYPES, TIBIA_TC_PRICE } from "../constants";
import type { UseOnlineTrainingState } from "../hooks/useOnlineTrainingState";
import type { ExerciseWeaponType } from "../types";
import { calculateOnlineTraining } from "../utils/calculateOnlineTraining";
import { calculateTrainingCost } from "../utils/calculateTrainingCost";

type OnlineTrainingSummaryProps = {
  weaponsState: UseOnlineTrainingState;
};

export function OnlineTrainingSummary({ weaponsState }: OnlineTrainingSummaryProps) {
  const { character, exerciseDummy, setExerciseDummy, doubleEvent, setDoubleEvent } = weaponsState;

  const calculations = useMemo(() => {
    return calculateOnlineTraining({
      ...character,
      dummyType: exerciseDummy ? "house" : "regular",
      doubleEvent,
    });
  }, [character, exerciseDummy, doubleEvent]);

  const totalCost = calculateTrainingCost(calculations.weaponsNeeded, TIBIA_TC_PRICE);
  const isWeaponNeeded = (label: ExerciseWeaponType) => !!calculations.weaponsNeeded?.[label];

  return (
    <Stack spacing={2}>
      {/* BONUSES */}
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight={600}>Bonuses</Typography>

        <Divider sx={{ my: 1 }} />
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={exerciseDummy}
                onChange={(e) => setExerciseDummy(e.target.checked)}
              />
            }
            label="Exercise dummy (10%)"
          />
          <FormControlLabel
            control={
              <Checkbox checked={doubleEvent} onChange={(e) => setDoubleEvent(e.target.checked)} />
            }
            label="Double Event (2x)"
          />
        </Stack>
      </Card>

      {/* WEAPONS NEEDED */}
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight={600}>Weapons Needed</Typography>
        <Divider sx={{ my: 1 }} />

        <Stack direction="row" spacing={2} mt={2}>
          {SKILL_WEAPON_TYPES.map((w) => (
            <Stack key={w.label} alignItems="center" spacing={0.5}>
              <Chip
                disabled={!isWeaponNeeded(w.label)}
                color={isWeaponNeeded(w.label) ? "primary" : "default"}
                icon={<GavelIcon />}
                label={`${w.label} (${w.formattedTime})`}
              />
              <Typography variant="overline" fontWeight={700}>
                {calculations.weaponsNeeded?.[w.label]}x
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Card>

      {/* TOTAL COST */}
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight={600}>Total Cost</Typography>
        <Divider sx={{ my: 1 }} />

        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MonetizationOnIcon fontSize="small" color="warning" />
            <Typography variant="body2" color="text.secondary">
              Gold
            </Typography>
            <Typography fontWeight={700}>{totalCost.formattedGold}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <PaidIcon fontSize="small" color="info" />
            <Typography variant="body2" color="text.secondary">
              Tibia Coins
            </Typography>
            <Typography fontWeight={700}>{totalCost.formattedTC}</Typography>
          </Stack>
        </Stack>
      </Card>

      {/* TOTAL TIME */}
      <Card variant="outlined" sx={{ p: 2, bgcolor: "action.hover" }}>
        <Typography fontWeight={600}>Total Training Time</Typography>
        <Divider sx={{ my: 1 }} />

        <Typography color="secondary.light" variant="overline" fontWeight={600}>
          {calculations.timeFormatted}
        </Typography>
      </Card>
    </Stack>
  );
}
