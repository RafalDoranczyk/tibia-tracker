"use client";

import { Grid } from "@mui/material";
import { useState } from "react";

import { EmptyState } from "@/components";

import type { MonsterWithCharacterProgress } from "../schemas";
import { MonsterCard } from "./MonsterCard";
import { MonsterDetailsDrawer } from "./MonsterDetailsDrawer";

type BestiaryCardGridProps = {
  monstersWithProgress: MonsterWithCharacterProgress[];
};

export function BestiaryCardGrid({ monstersWithProgress }: BestiaryCardGridProps) {
  const [selectedMonster, setSelectedMonster] = useState<MonsterWithCharacterProgress | null>(null);

  if (monstersWithProgress.length === 0) {
    return <EmptyState variant="monsters" title="No monsters found with the selected filters." />;
  }

  return (
    <>
      <Grid container spacing={2} alignItems="flex-start">
        {monstersWithProgress.map((monster) => (
          <Grid
            key={monster.id}
            size={{ xs: 12, md: 4, xl: 3, xxl: 2 }}
            sx={{ display: "flex", justifyContent: "center", maxWidth: 280 }}
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
