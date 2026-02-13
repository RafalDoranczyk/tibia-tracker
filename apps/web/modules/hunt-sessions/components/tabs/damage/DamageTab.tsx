import { Grid } from "@mui/material";

import type { DamageElement, MonsterPreview } from "../../../schemas";
import { DamageElements } from "./DamageElements";
import { DamageSources } from "./DamageSources";

type DamageTabProps = {
  damageElementList: DamageElement[];
  monsterList: MonsterPreview[];
};

export function DamageTab({ damageElementList, monsterList }: DamageTabProps) {
  return (
    <Grid container direction={{ xs: "column", md: "row" }} spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <DamageElements damageElementList={damageElementList} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DamageSources monsterList={monsterList} />
      </Grid>
    </Grid>
  );
}
