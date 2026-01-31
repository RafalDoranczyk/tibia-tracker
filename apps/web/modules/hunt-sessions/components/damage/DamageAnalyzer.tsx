"use client";

import { Grid } from "@mui/material";

import type { DamageElement, MonsterPreview } from "../../types";
import { DamageElements } from "./DamageElements";
import { DamageSources } from "./DamageSources";

type DamageAnalyzerProps = {
  damageElementList: DamageElement[];
  monsterList: MonsterPreview[];
};

export function DamageAnalyzer({ damageElementList, monsterList }: DamageAnalyzerProps) {
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
