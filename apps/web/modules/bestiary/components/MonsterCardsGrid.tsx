import { Box, Grid } from "@mui/material";

import { EmptyState } from "@/components";

import type { MonsterWithCharacterProgress } from "../types";
import { MonsterCard } from "./MonsterCard";

type MonsterCardsGridProps = {
  monsters: MonsterWithCharacterProgress[];
};
export function MonsterCardsGrid({ monsters }: MonsterCardsGridProps) {
  return monsters.length ? (
    <Grid container spacing={2} mb={2}>
      {monsters.map((monster) => (
        <Grid key={monster.id} sx={{ display: "flex", justifyContent: "center" }}>
          <MonsterCard monster={monster} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box display="flex" justifyContent="center" width="100%">
      <EmptyState title="No monsters found with the selected filters." />
    </Box>
  );
}
