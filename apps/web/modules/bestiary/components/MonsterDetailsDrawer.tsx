import CloseIcon from "@mui/icons-material/Close";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Box, Divider, Drawer, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";
import type { DamageElementSlug } from "@/modules/damage-elements";
import type { MonsterWithCharacterProgress } from "../schemas";

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

type MonsterDetailsDrawerProps = {
  monster: MonsterWithCharacterProgress | null;
  open: boolean;
  onClose: () => void;
};

export function MonsterDetailsDrawer({ monster, open, onClose }: MonsterDetailsDrawerProps) {
  const resistances = monster
    ? Object.entries(monster.elemental_resistances)
        .filter(([, value]) => value !== 100)
        .map(([key, value]) => ({
          key: key as DamageElementSlug,
          value: value ?? 100,
          diff: (value ?? 100) - 100,
        }))
    : [];

  const weaknesses = resistances.filter((r) => r.value > 100).sort((a, b) => b.value - a.value);
  const protections = resistances.filter((r) => r.value < 100).sort((a, b) => a.value - b.value);

  const renderProgressItem = (item: { key: DamageElementSlug; value: number; diff: number }) => {
    const meta = ELEMENT_META[item.key];
    const isWeakness = item.value > 100;
    const isImmune = item.value <= 0;
    const statusColor = isWeakness ? "#f43f5e" : isImmune ? "#fbbf24" : "#4ade80";

    return (
      <Box key={item.key}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold", color: meta.color }}>
            {meta.label}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold", color: statusColor }}>
            {isImmune ? "IMMUNE" : item.diff > 0 ? `+${item.diff}%` : `${item.diff}%`}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={isImmune ? 100 : Math.min(Math.abs(item.diff), 100)}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.05)",
            "& .MuiLinearProgress-bar": {
              bgcolor: statusColor,
              borderRadius: 3,
              boxShadow: `0 0 8px ${statusColor}40`,
            },
          }}
        />
      </Box>
    );
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {monster && (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
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

          <Divider />

          <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
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

            <Divider sx={{ my: 3 }} />

            {weaknesses.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#f43f5e",
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    display: "block",
                    mb: 2,
                  }}
                >
                  WEAKNESSES (TAKES MORE DAMAGE)
                </Typography>
                <Stack spacing={2.5}>{weaknesses.map(renderProgressItem)}</Stack>
              </Box>
            )}

            {protections.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#4ade80",
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    display: "block",
                    mb: 2,
                  }}
                >
                  RESISTANCES (TAKES LESS DAMAGE)
                </Typography>
                <Stack spacing={2.5}>{protections.map(renderProgressItem)}</Stack>
              </Box>
            )}

            {resistances.length === 0 && (
              <Typography
                variant="body2"
                color="text.disabled"
                sx={{ textAlign: "center", mt: 4, fontStyle: "italic" }}
              >
                No elemental vulnerabilities or resistances.
              </Typography>
            )}
          </Box>

          <Box
            sx={{ p: 2, bgcolor: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Typography variant="caption" color="text.disabled" align="center" display="block">
              Difficulty Level: {monster.bestiary_difficulty}/5
            </Typography>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
