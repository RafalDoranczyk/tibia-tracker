import CloseIcon from "@mui/icons-material/Close";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Box, Divider, Drawer, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";
import type { DamageElementSlug } from "@/modules/damage-elements";
import type { MonsterWithCharacterProgress } from "../schemas";

type MonsterDetailsDrawerProps = {
  monster: MonsterWithCharacterProgress | null;
  open: boolean;
  onClose: () => void;
};

export function MonsterDetailsDrawer({ monster, open, onClose }: MonsterDetailsDrawerProps) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {monster && (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <Box
            sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ bgcolor: "rgba(255,255,255,0.03)", p: 1, borderRadius: 2 }}>
                <Image src={monster.image_path} alt={monster.name} width={48} height={48} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {monster.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase" }}
                >
                  {monster.bestiary_class}
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

          <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
            {/* Quick Stats Section */}
            <Typography
              variant="subtitle2"
              color="primary.light"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              General Information
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <FavoriteIcon sx={{ fontSize: 18, color: "#f43f5e" }} />
                <Typography variant="body2">
                  HP: <strong>{monster.hp}</strong>
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <StarIcon sx={{ fontSize: 18, color: "#fbbf24" }} />
                <Typography variant="body2">
                  Experience: <strong>{monster.exp}</strong>
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <DiamondIcon sx={{ fontSize: 18, color: "#60a5fa" }} />
                <Typography variant="body2">
                  Charm Points: <strong>{monster.charm_points}</strong>
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.06)" }} />

            {/* Resistances Section */}
            <Typography
              variant="subtitle2"
              color="primary.light"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Elemental Resistances
            </Typography>
            <Stack spacing={2.5}>
              {Object.entries(monster.elemental_resistances).map(([key, value]) => {
                const meta = ELEMENT_META[key as DamageElementSlug] || {
                  color: "#ccc",
                  label: key,
                };
                return (
                  <Box key={key}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, color: "text.secondary" }}
                      >
                        {meta.label}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                        {value}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(value ?? 0, 100)}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: "rgba(255,255,255,0.05)",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: meta.color,
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(0,0,0,0.2)" }}>
            <Typography variant="caption" color="text.disabled" align="center" display="block">
              Difficulty Level: {monster.bestiary_difficulty}/5
            </Typography>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}

const ELEMENT_META: Record<DamageElementSlug, { color: string; label: string }> = {
  physical: { color: "#94a3b8", label: "Physical" },
  fire: { color: "#f43f5e", label: "Fire" },
  ice: { color: "#38bdf8", label: "Ice" },
  energy: { color: "#a855f7", label: "Energy" },
  earth: { color: "#4ade80", label: "Earth" },
  holy: { color: "#fde047", label: "Holy" },
  death: { color: "#64748b", label: "Death" },
  mana_drain: { color: "#3b82f6", label: "Mana Drain" },
  life_drain: { color: "#ef4444", label: "Life Drain" },
};
