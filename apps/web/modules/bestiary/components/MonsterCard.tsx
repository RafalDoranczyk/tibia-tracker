"use client";

import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import SpeedIcon from "@mui/icons-material/Speed";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  LinearProgress,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useState } from "react";

import { useMonsterProgress } from "../hooks/useMonsterProgress";
import type { MonsterWithCharacterProgress } from "../schemas";
import { MonsterPortraitFrame } from "./MonsterPortraitFrame";

type MonsterCardProps = {
  monster: MonsterWithCharacterProgress;
  onOpenDetails: () => void;
};

export function MonsterCard({ monster: monsterToUpdate, onOpenDetails }: MonsterCardProps) {
  const {
    monster: {
      kills,
      bestiary_kills,
      name,
      image_path,
      bestiary_class,
      hp,
      exp,
      has_soul,
      charm_points,
      bestiary_difficulty,
    },
    isLoading,
    isBestiaryCompleted: completed,
    toggleSoulpit,
    toggleFullBestiary,
    saveKills,
  } = useMonsterProgress(monsterToUpdate);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState(kills);

  const handleSaveKills = () => {
    setAnchorEl(null);
    saveKills(value);
  };

  const progress = Math.min((kills / bestiary_kills.stage3) * 100, 100);

  return (
    <Card
      sx={{
        pointerEvents: isLoading ? "none" : "auto",
        width: "100%",
        position: "relative",
        opacity: completed ? 1 : 0.5,
        transition: "transform 200ms ease, opacity 200ms ease",
        willChange: "transform, opacity",

        [`.${AVATAR_CLASSNAME}`]: {
          transition: "transform 200ms ease",
          transformOrigin: "center",
          willChange: "transform",
        },

        "&:hover": {
          transform: "translateY(-4px) scale(1.008)",
        },

        [`&:hover .${AVATAR_CLASSNAME}`]: {
          transform: "scale(1.3) rotate(-5deg)",
        },
      }}
    >
      {isLoading && <MonsterCardOverlay />}

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={(t) => ({
          height: 8,
          "& .MuiLinearProgress-bar": {
            backgroundColor: completed ? t.palette.secondary.main : t.palette.primary.light,
            opacity: completed ? 1 : 0.3,
          },
        })}
      />

      <CardHeader
        avatar={
          <Box className={AVATAR_CLASSNAME}>
            <Image src={image_path} alt={name} width={64} height={64} />
          </Box>
        }
        title={
          <Typography variant="caption" display="block" fontWeight="bold">
            {name}
          </Typography>
        }
        subheader={
          <Typography color="textSecondary" variant="caption">
            {bestiary_class}
          </Typography>
        }
      />

      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" height={28}>
          <Box
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={(t) => ({
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              borderRadius: 1,
              fontSize: 10,
              fontWeight: 700,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 150ms ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
                borderColor: t.palette.primary.main,
              },
            })}
          >
            {kills} / {bestiary_kills.stage3}
          </Box>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Stack spacing={1} sx={{ p: 1.5, width: 160 }}>
              <TextField
                size="small"
                type="number"
                label="Set Kills"
                fullWidth
                value={value}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const clampedVal = Math.max(0, Math.min(val, bestiary_kills.stage3));
                  setValue(clampedVal);
                }}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: bestiary_kills.stage3,
                    step: 1,
                  },
                }}
              />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button size="small" onClick={() => setAnchorEl(null)}>
                  Cancel
                </Button>
                <Button size="small" variant="contained" onClick={handleSaveKills}>
                  Save
                </Button>
              </Stack>
            </Stack>
          </Popover>

          {!completed && (
            <Tooltip title="Click to mark as completed (Stage 3)">
              <Button
                variant="contained"
                onClick={toggleFullBestiary}
                sx={{ width: 90, maxHeight: "100%" }}
              >
                Complete
              </Button>
            </Tooltip>
          )}
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />
        {/* Basic Stats */}
        <Stack spacing={0.5} color="textSecondary">
          <Stack spacing={1}>
            {/* HP */}
            <Stack direction="row" spacing={1} alignItems="center">
              <FavoriteIcon sx={{ fontSize: 16, color: "#f43f5e" }} />
              <Typography variant="body2" color="text.secondary">
                HP: <strong>{hp}</strong>
              </Typography>
            </Stack>

            {/* XP */}
            <Stack direction="row" spacing={1} alignItems="center">
              <StarIcon sx={{ fontSize: 16, color: "#fbbf24" }} />
              <Typography variant="body2" color="text.secondary">
                XP: <strong>{exp}</strong>
              </Typography>
            </Stack>

            {/* Charm Points */}
            <Stack direction="row" spacing={1} alignItems="center">
              <DiamondIcon sx={{ fontSize: 16, color: "#60a5fa" }} />
              <Typography variant="body2" color="text.secondary">
                Charm Points: <strong>{charm_points}</strong>
              </Typography>
            </Stack>

            {/* Difficulty */}
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <SpeedIcon sx={{ fontSize: 16, color: "#a78bfa" }} />
              <Typography variant="body2" sx={{ minWidth: 70, pl: 0.8 }}>
                Difficulty
              </Typography>
              <Rating
                value={bestiary_difficulty}
                max={5}
                readOnly
                size="small"
                icon={<StarIcon fontSize="inherit" />}
                emptyIcon={<StarIcon fontSize="inherit" />}
                sx={(t) => ({
                  "& .MuiRating-iconFilled": {
                    color: t.palette.secondary.main,
                  },
                  "& .MuiRating-iconEmpty": {
                    color: t.palette.text.disabled,
                  },
                })}
              />
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Tooltip title={has_soul ? "Soul Unlocked" : "Unlock Soulpit"} placement="top">
          <Box
            onClick={toggleSoulpit}
            sx={{
              cursor: "pointer",
              opacity: has_soul ? 1 : 0.5,
              filter: has_soul ? "none" : "grayscale(1)",
              "&:hover": has_soul
                ? {
                    transform: "scale(1.05)",
                  }
                : undefined,
            }}
          >
            <MonsterPortraitFrame src={image_path} alt={name} size={32} />
          </Box>
        </Tooltip>

        <Tooltip title="Details">
          <IconButton
            size="small"
            onClick={onOpenDetails}
            sx={(t) => ({
              borderRadius: 1,
              backgroundColor: t.palette.action.hover,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: t.palette.action.selected,
                transform: "translateX(3px)",
              },
            })}
          >
            <ReadMoreIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

function MonsterCardOverlay() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <LinearProgress
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 8,
          borderRadius: 1,
          backgroundColor: "rgba(255,255,255,0.06)",
        }}
      />
      <Typography variant="body2" fontWeight="bold">
        Updating...
      </Typography>
    </Box>
  );
}

const AVATAR_CLASSNAME = "monster-avatar";
