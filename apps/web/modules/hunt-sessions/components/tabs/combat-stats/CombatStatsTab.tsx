import { Grid } from "@mui/material";

import type { DamageElement } from "../../../schemas";
import { Resistances } from "./Resistances";

type CombatStatsTabProps = {
  damageElementList: DamageElement[];
  elementResistanceStatId: string; // stat_definitions.id for "element_resistance"
};

export function CombatStatsTab({
  damageElementList,
  elementResistanceStatId,
}: CombatStatsTabProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Resistances
          damageElementList={damageElementList}
          elementResistanceStatId={elementResistanceStatId}
        />
      </Grid>
    </Grid>
  );
}
