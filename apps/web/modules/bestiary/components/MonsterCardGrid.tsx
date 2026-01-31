import { Box, Grid } from "@mui/material";

import { EmptyState } from "@/components";

import type { MonsterWithCharacterProgress } from "../schemas";
import { MonsterCard } from "./MonsterCard";

type MonsterCardGridProps = {
  monsters: MonsterWithCharacterProgress[];
};
export function MonsterCardGrid({ monsters }: MonsterCardGridProps) {
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
      <EmptyState variant="monsters" title="No monsters found with the selected filters." />
    </Box>
  );
}
