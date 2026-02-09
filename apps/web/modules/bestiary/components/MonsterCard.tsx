"use client";

import OpenInBrowser from "@mui/icons-material/OpenInBrowser";
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

type MonsterCardProps = {
  monster: MonsterWithCharacterProgress;
  onOpenDetails: () => void;
};

export function MonsterCard({ monster: monsterToUpdate, onOpenDetails }: MonsterCardProps) {
  const { monster, isLoading, isBestiaryCompleted, toggleSoulpit, toggleFullBestiary, saveKills } =
    useMonsterProgress(monsterToUpdate);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState(monster.kills);

  const handleSaveKills = () => {
    setAnchorEl(null);
    saveKills(value);
  };

  return (
    <Card
      sx={{
        pointerEvents: isLoading ? "none" : "auto",
        width: "100%",
        position: "relative",
        opacity: isBestiaryCompleted ? 1 : 0.55,
        transition: "transform 200ms ease",
        willChange: "transform",

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
        value={(monster.kills / monster.bestiary_kills.stage3) * 100}
        sx={(t) => ({
          height: 8,
          borderRadius: 1,
          backgroundColor: "rgba(255,255,255,0.06)",

          "& .MuiLinearProgress-bar": {
            backgroundColor: isBestiaryCompleted
              ? t.palette.secondary.main
              : t.palette.primary.main,
            opacity: isBestiaryCompleted ? 1 : 0.3,
          },
        })}
      />

      <CardHeader
        avatar={
          <Box className={AVATAR_CLASSNAME} p={0.2}>
            <Image src={monster.image_path} alt={monster.name} width={52} height={52} />
          </Box>
        }
        action={
          <Tooltip
            tabIndex={0}
            title={isBestiaryCompleted ? "Set as not completed" : "Set as completed"}
          >
            <Box
              onClick={toggleFullBestiary}
              sx={(t) => ({
                px: 0.9,
                py: 0.1,
                borderRadius: 1,
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 150ms ease",

                backgroundColor: isBestiaryCompleted
                  ? `${t.palette.secondary.main}18`
                  : t.palette.action.hover,

                color: isBestiaryCompleted ? t.palette.secondary.main : t.palette.primary.light,

                borderColor: isBestiaryCompleted
                  ? t.palette.secondary.main
                  : t.palette.primary.dark,

                border: "1px solid",

                "&:hover": {
                  backgroundColor: isBestiaryCompleted
                    ? `${t.palette.secondary.main}33`
                    : t.palette.action.selected,
                },
              })}
            >
              {isBestiaryCompleted ? "Unlocked" : "Locked"}
            </Box>
          </Tooltip>
        }
        title={
          <Typography variant="caption" display="block" fontWeight="bold">
            {monster.name}
          </Typography>
        }
        subheader={
          <Typography color="textSecondary" variant="caption">
            {monster.bestiary_class}
          </Typography>
        }
      />

      <CardContent>
        <Box
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            px: 1,
            py: 0.3,
            borderRadius: 1,
            fontSize: 11,
            color: "text.secondary",
            bgcolor: (t) => t.palette.background.paper,
            cursor: "pointer",

            "&:hover": {
              backgroundColor: (t) => t.palette.action.hover,
            },
          }}
        >
          {monster.kills}/{monster.bestiary_kills.stage3}
        </Box>

        {/* Save kills popover */}
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
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: monster.bestiary_kills.stage3,
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

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />
        {/* Basic Stats */}
        <Stack spacing={0.5} color="textSecondary">
          <Typography variant="body2">❤️ HP: {monster.hp}</Typography>
          <Typography variant="body2">⭐ XP: {monster.exp}</Typography>
          <Typography variant="body2">💎 Charm Points: {monster.charm_points}</Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" sx={{ minWidth: 70, pl: 0.8 }}>
              Difficulty
            </Typography>

            <Rating
              value={monster.bestiary_difficulty}
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

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />
      </CardContent>

      <CardActions sx={{ gap: 1, justifyContent: "space-between" }}>
        {/* Soulpit */}
        <Tooltip title={monster.has_soul ? "Soul Unlocked" : "Unlock Soulpit"} placement="top">
          <Box
            onClick={toggleSoulpit}
            sx={{
              cursor: "pointer",
              transition: "all 150ms ease",

              opacity: monster.has_soul ? 1 : 0.4,
              filter: monster.has_soul ? "none" : "grayscale(1)",
              transform: monster.has_soul ? "scale(1)" : "scale(0.95)",

              "&:hover": monster.has_soul
                ? {
                    transform: "scale(1.05)",
                  }
                : undefined,
            }}
          >
            <MonsterPortraitFrame src={monster.image_path} alt={monster.name} size={32} />
          </Box>
        </Tooltip>

        <Tooltip title="Details">
          <IconButton
            size="small"
            onClick={onOpenDetails}
            sx={(t) => ({
              ml: "auto",
              color: t.palette.text.secondary,
              borderRadius: 1,
              transition: "all 150ms ease",

              backgroundColor: "rgba(255,255,255,0.04)",

              "&:hover": {
                color: t.palette.primary.light,
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            })}
          >
            <OpenInBrowser fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
