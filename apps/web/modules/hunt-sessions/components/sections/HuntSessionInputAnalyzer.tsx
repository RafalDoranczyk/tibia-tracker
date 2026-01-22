"use client";

import { Stack } from "@mui/material";

import type { DamageElement } from "../../types";
import { HuntSessionInputDamageElements } from "./HuntSessionInputDamageElements";
import { HuntSessionInputDamageSources } from "./HuntSessionInputDamageSources";
import { HuntSessionSection } from "./HuntSessionSection";

type HuntSessionInputAnalyzerProps = {
  damageElementList: DamageElement[];
};

export function HuntSessionInputAnalyzer({ damageElementList }: HuntSessionInputAnalyzerProps) {
  return (
    <HuntSessionSection title="Input Analyzer">
      <Stack spacing={2}>
        <HuntSessionInputDamageElements damageElementList={damageElementList} />
        <HuntSessionInputDamageSources />
      </Stack>
    </HuntSessionSection>
  );
}
