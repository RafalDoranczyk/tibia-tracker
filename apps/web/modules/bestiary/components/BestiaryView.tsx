"use client";

import { Grid } from "@mui/material";
import { useState } from "react";

import type { FetchCharacterBestiaryResult, MonsterWithCharacterProgress } from "../schemas";

import { MonsterCard } from "./MonsterCard";
import { MonsterDetailsDrawer } from "./MonsterDetailsDrawer";

type BestiaryViewProps = {
  bestiary: FetchCharacterBestiaryResult;
};

export function BestiaryView({ bestiary }: BestiaryViewProps) {
  const [selectedMonster, setSelectedMonster] = useState<MonsterWithCharacterProgress | null>(null);

  return (
    <>
      <Grid container spacing={4}>
        {bestiary.monstersWithProgress.map((monster) => (
          <Grid
            key={monster.id}
            size={{ xs: 12, sm: 6, lg: 6, xl: 4, xxl: 2.4 }}
            sx={{ maxWidth: { xxl: 300 } }}
          >
            <MonsterCard monster={monster} onOpenDetails={() => setSelectedMonster(monster)} />
          </Grid>
        ))}
      </Grid>

      <MonsterDetailsDrawer
        monster={selectedMonster}
        open={Boolean(selectedMonster)}
        onClose={() => setSelectedMonster(null)}
      />
    </>
  );
}
