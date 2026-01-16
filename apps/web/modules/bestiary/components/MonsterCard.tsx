"use client";

import AutoAwesomeMosaicOutlined from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import Circle from "@mui/icons-material/Circle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Card,
  Collapse,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import { useMonsterProgress } from "../hooks/useMonsterProgress";
import type { MonsterWithCharacterProgress } from "../types";

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
          height: 3,
          borderRadius: "3px 3px 0 0",
          background: "rgba(255,255,255,0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#f5b342",
          },
        }}
      />
      <Typography variant="body2" fontWeight="bold">
        Updating...
      </Typography>
    </Box>
  );
}

type MonsterCardProps = {
  monster: MonsterWithCharacterProgress;
};

export function MonsterCard({ monster: initialMonster }: MonsterCardProps) {
  const {
    monster,
    isLoading,
    isBestiaryUnlocked,
    isEditingKills,
    editedKills,
    setEditedKills,
    startEditingKills,
    saveKills,
    toggleSoulpit,
    toggleFullBestiary,
  } = useMonsterProgress(initialMonster);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const resistances = monster.elemental_resistances;

  return (
    <Card
      sx={{
        position: "relative",
        backgroundColor: "#1c1c1c",
        borderRadius: 3,
        color: "white",
        p: 2,
        width: 280,
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        opacity: isBestiaryUnlocked ? 1 : 0.5,
      }}
    >
      {isLoading && <MonsterCardOverlay />}

      <Box
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          display: "flex",
          gap: 0.5,
        }}
      >
        <Tooltip title="Toggle Soulpit">
          <IconButton
            onClick={toggleSoulpit}
            size="small"
            sx={{ color: monster.has_soul ? "#f5b342" : "#666" }}
            disabled={isLoading}
          >
            <AutoAwesomeMosaicOutlined fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title={isBestiaryUnlocked ? "Unmark as fully unlocked" : "Mark as fully unlocked"}>
          <span>
            <IconButton
              onClick={toggleFullBestiary}
              size="small"
              sx={{ color: isBestiaryUnlocked ? "lime" : "#666" }}
              disabled={isLoading}
            >
              <Circle fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {/* Soulpit ribbon */}
      {monster.has_soul && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: -40,
            transform: "rotate(-35deg)",
            px: 5,
            py: 0.3,
            background: "linear-gradient(90deg, #f5b342, #d9a400)",
            color: "#000",
            fontSize: 12,
            fontWeight: "bold",
            textTransform: "uppercase",
            boxShadow: "0 0 6px rgba(255,215,0,0.4)",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: 0,
              width: 0,
              height: 0,
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
            },
            "&::before": {
              left: -12,
              borderRight: "12px solid #f5b342",
            },
            "&::after": {
              right: -12,
              borderLeft: "12px solid #d9a400",
            },
          }}
        >
          Soulpit
        </Box>
      )}

      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Image
          src={monster.image_url}
          alt={monster.name}
          width={64}
          height={64}
          className="rounded-md bg-neutral-900 p-1"
        />
        <Stack>
          <Typography variant="h6" fontWeight="bold">
            {monster.name}
          </Typography>
          <Typography variant="body2" color="gray">
            {monster.bestiary_class}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Stats */}
      <Stack spacing={0.5}>
        <Typography variant="body2">❤️ HP: {monster.hp}</Typography>
        <Typography variant="body2">⭐ XP: {monster.exp}</Typography>
        <Typography variant="body2">💎 Charm Points: {monster.charm_points}</Typography>
        <Typography variant="body2">⚔️ Difficulty: {monster.bestiary_difficulty}</Typography>
      </Stack>

      <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Details toggle */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ cursor: "pointer" }}
        onClick={() => setIsDetailsOpen((p) => !p)}
      >
        <Typography variant="subtitle2" color="gray">
          Details
        </Typography>
        {isDetailsOpen ? <ExpandLess /> : <ExpandMore />}
      </Stack>

      <Collapse in={isDetailsOpen} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2" color="gray" gutterBottom>
            Resistances
          </Typography>

          <Stack spacing={0.7}>
            {Object.entries(resistances).map(([type, value]) => (
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
                        type === "fire"
                          ? "#ff6b35"
                          : type === "ice"
                            ? "#63b3ed"
                            : type === "energy"
                              ? "#a855f7"
                              : type === "earth"
                                ? "#84cc16"
                                : "#ccc",
                    },
                  }}
                />
              </Stack>
            ))}
          </Stack>
        </Box>
      </Collapse>

      <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Kills */}
      <Box sx={{ mt: 1 }}>
        {isEditingKills ? (
          <TextField
            size="small"
            type="number"
            value={editedKills}
            autoFocus
            onChange={(e) => setEditedKills(Number(e.target.value))}
            onBlur={saveKills}
            inputProps={{
              min: 0,
              max: monster.bestiary_kills.stage3,
              style: { color: "white", textAlign: "center", fontSize: 14 },
            }}
            sx={{
              width: 100,
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "#111",
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#777" },
              },
            }}
          />
        ) : (
          <Typography
            variant="body2"
            onClick={startEditingKills}
            sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          >
            📊 Kills: {monster.kills} / {monster.bestiary_kills.stage3}
          </Typography>
        )}

        <LinearProgress
          variant="determinate"
          value={(monster.kills / monster.bestiary_kills.stage3) * 100}
          sx={{
            height: 8,
            mt: 0.5,
            borderRadius: 1,
            backgroundColor: "#333",
            "& .MuiLinearProgress-bar": { backgroundColor: "#ff4081" },
          }}
        />
      </Box>
    </Card>
  );
}
