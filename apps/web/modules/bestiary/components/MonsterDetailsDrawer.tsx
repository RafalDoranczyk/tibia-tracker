import { Box, Divider, Drawer, LinearProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";

import type { MonsterWithCharacterProgress } from "../schemas";

const RESISTANCE_TYPES = ["fire", "ice", "energy", "earth", "death"] as const;

const RESISTANCE_COLORS: Record<(typeof RESISTANCE_TYPES)[number], string> = {
  fire: "#ff6b35",
  ice: "#63b3ed",
  energy: "#a855f7",
  earth: "#84cc16",
  death: "#ccc",
};

type MonsterDetailsDrawerProps = {
  monster: MonsterWithCharacterProgress | null;
  open: boolean;
  onClose: () => void;
};

export function MonsterDetailsDrawer({ monster, open, onClose }: MonsterDetailsDrawerProps) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {monster && (
        <Box sx={{ p: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Image src={monster.image_path} alt={monster.name} width={64} height={64} />
            <Box>
              <Typography fontWeight="bold">{monster.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {monster.bestiary_class}
              </Typography>
            </Box>
          </Stack>

          <Divider
            sx={{
              my: 2,
              borderColor: "rgba(255,255,255,0.1)",
            }}
          />

          {/* Content */}
          <Box p={2}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Resistances
            </Typography>

            <Stack spacing={0.7}>
              {Object.entries(monster.elemental_resistances).map(([type, value]) => (
                <Stack key={type}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">{type}</Typography>
                    <Typography variant="body2">{value}%</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(value, 130)}
                    sx={{
                      height: 6,
                      borderRadius: 1,
                      backgroundColor: "#333",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          RESISTANCE_COLORS[type as (typeof RESISTANCE_TYPES)[number]],
                      },
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
