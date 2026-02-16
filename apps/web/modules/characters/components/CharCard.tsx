"use client";

import LoginIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Avatar,
  alpha,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { TooltipIconButton } from "@/components";
import type { AppCharacter } from "../schemas";

type CharCardProps = {
  character: AppCharacter;
  isActive: boolean;
  onSelect: (character: AppCharacter) => void;
  onSettings: (character: AppCharacter) => void;
};

export function CharCard({ character, onSelect, onSettings, isActive }: CharCardProps) {
  const lastDeath = character.deaths && character.deaths.length > 0 ? character.deaths[0] : null;
  const lastLoginDate = character.last_login
    ? new Date(character.last_login).toLocaleDateString()
    : "Never";
  return (
    <Card
      onClick={() => !isActive && onSelect(character)}
      variant="outlined"
      sx={{
        height: "100%",
        position: "relative",
        cursor: isActive ? "default" : "pointer",
        background: isActive
          ? "linear-gradient(135deg, #1e1e1e 0%, #252525 100%)"
          : "rgba(255,255,255,0.02)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderColor: isActive ? "secondary.main" : "divider",
        borderWidth: isActive ? 2 : 1,
        boxShadow: isActive ? `0 0 20px ${alpha("#9c27b0", 0.2)}` : "none",

        "&:hover": {
          borderColor: isActive ? "secondary.main" : "primary.main",
          transform: isActive ? "none" : "translateY(-4px)",
          boxShadow: isActive ? `0 0 25px ${alpha("#9c27b0", 0.3)}` : "0 10px 20px rgba(0,0,0,0.4)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 1.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                bgcolor: isActive ? "secondary.main" : "rgba(255,255,255,0.1)",
                width: 48,
                height: 48,
                fontWeight: 800,
                fontSize: "1rem",
                border: isActive ? "2px solid" : "none",
                borderColor: alpha("#fff", 0.2),
              }}
              variant="rounded"
            >
              {character.name.substring(0, 2).toUpperCase()}
            </Avatar>

            <Box>
              <Typography variant="h6" fontWeight={900} sx={{ lineHeight: 1.2, mb: 0.5 }}>
                {character.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="caption"
                  color="secondary.light"
                  sx={{ fontWeight: 700, textTransform: "uppercase" }}
                >
                  {character.world}
                </Typography>
                <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "text.disabled" }} />
                <Typography variant="caption" color="text.secondary">
                  Level {character.level ?? "???"}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          {/* PRAWA STRONA: Ikona Active Status */}
          <Tooltip title={isActive ? "Active character" : "Set as active"} arrow>
            <Box sx={{ display: "flex", alignItems: "center", pt: 0.5 }}>
              {isActive ? (
                <Chip
                  icon={<CheckCircleIcon sx={{ fontSize: "14px !important" }} />}
                  label="ACTIVE"
                  size="small"
                  color="secondary"
                  sx={{ fontSize: 10, fontWeight: 900, height: 20, pl: 0.5 }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={{
                    fontSize: 22,
                    color: "text.disabled",
                    opacity: 0.4,
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "primary.main",
                      opacity: 1,
                      transform: "scale(1.1)",
                    },
                  }}
                />
              )}
            </Box>
          </Tooltip>
        </Stack>

        <Divider sx={{ mb: 2, opacity: 0.1 }} />

        <Stack spacing={2}>
          {/* Vocation & Residence */}
          <Stack direction="row" spacing={3}>
            <Box>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ textTransform: "uppercase", fontWeight: 700, fontSize: 10, display: "block" }}
              >
                Vocation
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {character.vocation?.replace(/_/g, " ")}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ textTransform: "uppercase", fontWeight: 700, fontSize: 10, display: "block" }}
              >
                Residence
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <HomeIcon sx={{ fontSize: 14, color: "text.disabled" }} />
                <Typography variant="body2" fontWeight={600}>
                  {character.residence ?? "Unknown"}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          {/* Achievement Points & Last Login */}
          <Box>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <EmojiEventsIcon sx={{ fontSize: 14, color: "gold" }} />
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10 }}
                  >
                    Achievement Points
                  </Typography>
                </Stack>
                <Typography variant="body2" fontWeight={700} color="gold">
                  {character.achievement_points ?? 0}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <LoginIcon sx={{ fontSize: 14, color: "gold" }} />
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10 }}
                  >
                    Last Login
                  </Typography>
                </Stack>
                <Typography variant="caption" fontWeight={600}>
                  {lastLoginDate}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Recent Activity (Deaths) */}
          <Box>
            <Typography
              variant="caption"
              color={lastDeath ? "error.light" : "text.disabled"}
              sx={{
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: 10,
                display: "block",
                mb: 0.5,
              }}
            >
              Recent Activity
            </Typography>
            <Box
              sx={{
                p: 1,
                borderRadius: 1,
                bgcolor: lastDeath ? alpha("#ff1744", 0.05) : "transparent",
                border: lastDeath ? `1px solid ${alpha("#ff1744", 0.1)}` : "none",
              }}
            >
              {lastDeath ? (
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 0.5,
                    color: "error.light",
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  <span style={{ fontSize: "12px" }}>💀</span>
                  {`Lvl ${lastDeath.level} by ${lastDeath.reason}`}
                </Typography>
              ) : (
                <Typography variant="caption" color="text.disabled" sx={{ fontStyle: "italic" }}>
                  No recent deaths tracked.
                </Typography>
              )}
            </Box>
          </Box>
        </Stack>
      </CardContent>

      <Divider sx={{ opacity: 0.05 }} />

      <CardActions sx={{ justifyContent: "flex-end", px: 2, py: 1 }}>
        <TooltipIconButton
          variant="settings"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onSettings(character);
          }}
          sx={{ opacity: 0.6, "&:hover": { opacity: 1, color: "primary.main" } }}
        />
      </CardActions>
    </Card>
  );
}
