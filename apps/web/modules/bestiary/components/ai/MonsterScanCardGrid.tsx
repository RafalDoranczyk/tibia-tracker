import { Box, Button, Stack, Typography } from "@mui/material";
import type { AIMonsterScan } from "../../schemas";
import { MonsterScanCard } from "./MonsterScanCard";

type MonsterScanCardGridProps = {
  scannedMonsters: AIMonsterScan[];
  setScannedMonsters: (monsters: AIMonsterScan[] | null) => void;
};

export function MonsterScanCardGrid({
  scannedMonsters,
  setScannedMonsters,
}: MonsterScanCardGridProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Detected {scannedMonsters.length} monsters:
      </Typography>

      <Box
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          pr: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {scannedMonsters.map((monster) => (
          <MonsterScanCard key={monster.name} monster={monster} />
        ))}
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button fullWidth variant="outlined" onClick={() => setScannedMonsters(null)}>
          Rescan
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => {
            console.log("save");
          }}
        >
          Confirm & Save
        </Button>
      </Stack>
    </Stack>
  );
}
