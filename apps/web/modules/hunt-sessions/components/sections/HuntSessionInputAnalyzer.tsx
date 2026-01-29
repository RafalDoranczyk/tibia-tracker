"use client";

import { Grid } from "@mui/material";

import type { DamageElement } from "../../types";
import { HuntSessionInputDamageElements } from "./HuntSessionInputDamageElements";
import { HuntSessionInputDamageSources } from "./HuntSessionInputDamageSources";

type HuntSessionInputAnalyzerProps = {
  damageElementList: DamageElement[];
};

export function HuntSessionInputAnalyzer({ damageElementList }: HuntSessionInputAnalyzerProps) {
  return (
    <Grid container direction={{ xs: "column", md: "row" }} spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <HuntSessionInputDamageElements damageElementList={damageElementList} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <HuntSessionInputDamageSources />
      </Grid>
    </Grid>
  );
}
