import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsightsIcon from "@mui/icons-material/Insights";
import PetsIcon from "@mui/icons-material/Pets";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ShieldIcon from "@mui/icons-material/Shield";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { getPublicAssetUrl } from "@/core/assets";
import type { AIHuntSessionScan, DamageElement } from "../../schemas";

const getResistanceMeta = (damageElementList: DamageElement[], scannedKey: string) => {
  const normalize = (name: string) => name.toLowerCase().replace(/[\s_]/g, "");
  const target = normalize(scannedKey);

  return damageElementList.find((item) => normalize(item.name) === target);
};

const formatSkillName = (skill: string) => {
  if (skill === "magic") return "Magic Level";
  return skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase();
};

export const getActiveResistances = (resistances: Record<string, number | undefined>) => {
  return Object.entries(resistances).reduce(
    (acc, [key, value]) => {
      if (value && value > 0) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, number>
  );
};

type AIScanPreviewCardProps = {
  scan: AIHuntSessionScan;
  damageElementList: DamageElement[];
  onClear: () => void;
};

export function AIScanPreviewCard({ scan, damageElementList, onClear }: AIScanPreviewCardProps) {
  const { skills_window, hunt_analyser } = scan;

  const activeResistances = Object.fromEntries(
    Object.entries(skills_window?.resistances || {}).filter(([_, val]) => val !== null)
  );

  const resistanceEntries = Object.entries(activeResistances);

  return (
    <Card
      sx={{
        position: "relative",
        border: "1px solid rgba(124, 58, 237, 0.4)",
        background: "linear-gradient(135deg, #0f0f12 0%, #1a1a20 100%)",
        overflow: "visible",
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <AutoAwesomeIcon sx={{ color: "#a78bfa" }} />
            <Typography variant="h6" color="#a78bfa" fontWeight="bold">
              AI Analysis Data
            </Typography>
          </Stack>
          <Chip label="Ready to Sync" color="secondary" size="small" sx={{ fontWeight: "bold" }} />
        </Stack>

        <Divider sx={{ my: 2, opacity: 0.2 }} />

        <Grid container spacing={3}>
          {/* SESSION & PERFORMANCE */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <SectionHeader icon={<InsightsIcon />} title="Performance" />
            <Paper sx={{ p: 2, bgcolor: "rgba(255,255,255,0.02)" }}>
              <DataRow label="Duration" value={hunt_analyser?.session_duration} />
              <Divider sx={{ my: 1, opacity: 0.1 }} />
              <DataRow
                label="Raw XP Gain"
                value={hunt_analyser?.raw_xp_gain?.toLocaleString()}
                color="secondary.light"
                bold
              />
              <DataRow label="XP Gain" value={hunt_analyser?.xp_gain?.toLocaleString()} bold />
              <DataRow label="Raw XP/h" value={hunt_analyser?.raw_xp_h?.toLocaleString()} />
              <DataRow label="XP/h" value={hunt_analyser?.xp_h?.toLocaleString()} />
              <Divider sx={{ my: 1, opacity: 0.1 }} />
              <DataRow
                label="Loot"
                value={hunt_analyser?.loot?.toLocaleString()}
                color="success.main"
              />
              <DataRow
                label="Supplies"
                value={hunt_analyser?.supplies?.toLocaleString()}
                color="error.main"
              />
              <DataRow
                label="Balance"
                value={hunt_analyser?.balance?.toLocaleString()}
                bold
                color={(hunt_analyser?.balance ?? 0) >= 0 ? "success.main" : "error.main"}
              />
              <Divider sx={{ my: 1, opacity: 0.1 }} />
              <DataRow label="Damage Total" value={hunt_analyser?.damage_total?.toLocaleString()} />
              <DataRow label="Damage/h" value={hunt_analyser?.damage_h?.toLocaleString()} />
              <DataRow
                label="Healing Total"
                value={hunt_analyser?.healing_total?.toLocaleString()}
              />
              <DataRow label="Healing/h" value={hunt_analyser?.healing_h?.toLocaleString()} />
            </Paper>
          </Grid>

          {/* CHARACTER & RESISTS */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <SectionHeader icon={<ShieldIcon />} title="Combat Stats" />
            <Paper sx={{ p: 2, bgcolor: "rgba(255,255,255,0.02)" }}>
              <DataRow label="Level" value={skills_window?.base_stats.level} bold />
              <Divider sx={{ my: 1, opacity: 0.1 }} />
              <DataRow label="Mitigation" value={skills_window?.base_stats.mitigation} unit="%" />
              <DataRow label="Armor" value={skills_window?.base_stats.armor_value} />
              <DataRow label="Defense" value={skills_window?.base_stats.defense_value} />

              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ mt: 2, display: "block", mb: 1, letterSpacing: 1 }}
              >
                RESISTANCES
              </Typography>
              <Grid container spacing={1}>
                {resistanceEntries.length === 0 ? (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="caption" color="text.secondary">
                      No active resistances detected.
                    </Typography>
                  </Grid>
                ) : (
                  resistanceEntries.map(([res, val]) => {
                    const meta = getResistanceMeta(damageElementList, res);
                    const displayValue = val && val > 100 ? Math.round(val / 100) : val;

                    return (
                      <Grid size={{ xs: 6 }} key={res}>
                        <Chip
                          avatar={
                            <Avatar
                              src={getPublicAssetUrl(meta?.image_path)}
                              sx={{
                                bgcolor: "transparent",
                                width: 16,
                                height: 16,
                                "& img": { objectFit: "contain", p: 0.5 },
                              }}
                            />
                          }
                          label={`${meta?.name}: ${displayValue}%`}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.65rem",
                            width: "100%",
                            justifyContent: "flex-start",
                          }}
                        />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </Paper>
          </Grid>

          {/* SKILL LEVELS */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <SectionHeader icon={<PsychologyIcon />} title="Skill Levels" />
            <Paper sx={{ p: 2, bgcolor: "rgba(255,255,255,0.02)" }}>
              <Grid container spacing={1.5}>
                {Object.entries(skills_window?.skill_levels || {}).map(([skill, val]) => (
                  <Grid size={{ xs: 6 }} key={skill}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#a78bfa" }} />
                      <Typography variant="caption" color="text.secondary">
                        {formatSkillName(skill)}:
                      </Typography>
                      <Typography variant="caption" fontWeight="bold">
                        {val}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* KILLED MONSTERS */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <SectionHeader icon={<PetsIcon />} title="Killed Monsters" />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                maxHeight: 180,
                overflowY: "auto",
                p: 1,
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: 1,
              }}
            >
              {hunt_analyser?.killed_monsters.length === 0 && (
                <Typography variant="caption" color="text.disabled">
                  No monsters detected.
                </Typography>
              )}
              {hunt_analyser?.killed_monsters.map((m) => (
                <Tooltip key={m.name} title={m.name}>
                  <Chip
                    avatar={
                      <Avatar sx={{ width: 24, height: 24, bgcolor: "rgba(167, 139, 250, 0.1)" }}>
                        {m.name[0]}
                      </Avatar>
                    }
                    label={`${m.amount}x ${m.name}`}
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(167, 139, 250, 0.2)",
                      "& .MuiChip-label": { fontSize: "0.7rem" },
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactElement; title: string }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5, color: "#a78bfa" }}>
      {icon}
      <Typography variant="overline" fontWeight="bold" sx={{ letterSpacing: 1.5 }}>
        {title}
      </Typography>
    </Stack>
  );
}

function DataRow({ label, value, unit, color, bold }: any) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
      <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={bold ? 900 : 500} sx={{ color }} fontSize="0.8rem">
        {value ?? "0"}
        {unit && (
          <Box component="span" sx={{ ml: 0.3, opacity: 0.6 }}>
            {unit}
          </Box>
        )}
      </Typography>
    </Stack>
  );
}
