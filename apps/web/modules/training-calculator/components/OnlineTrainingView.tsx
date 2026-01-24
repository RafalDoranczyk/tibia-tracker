import { Grid } from "@mui/material";

import { useOnlineTrainingState } from "../hooks/useOnlineTrainingState";
import { OnlineTrainingSummary } from "./OnlineTrainingSummary";
import { TrainingWeaponCharacterCard } from "./TrainingWeaponCharacterCard";

export function OnlineTrainingView() {
  const weaponsState = useOnlineTrainingState();

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid size={{ xs: 12, lg: 7 }} sx={{ display: "flex", flexDirection: "column" }}>
        <TrainingWeaponCharacterCard weaponsState={weaponsState} />
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }} sx={{ display: "flex", flexDirection: "column" }}>
        <OnlineTrainingSummary weaponsState={weaponsState} />
      </Grid>
    </Grid>
  );
}
