"use client";

import { AutoAwesomeMosaicOutlined, Circle, ExpandLess, ExpandMore } from "@mui/icons-material";
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

import type { MonsterWithCharacterProgress } from "@/modules/bestiary";
import { useRequiredCharacterId } from "@/providers/feature/dashboard";

import { updateCharacterBestiaryEntry } from "../actions/updateCharacterBestiary";

type MonsterCardProps = {
  monster: MonsterWithCharacterProgress;
};

const BESTIARY_FULL_STAGE = 3;

export function MonsterCard({ monster }: MonsterCardProps) {
  const characterId = useRequiredCharacterId();
  const [localMonster, setLocalMonster] = useState(monster);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditingKills, setIsEditingKills] = useState(false);
  const [editedKills, setEditedKills] = useState(localMonster.kills);

  const resistances = localMonster.elemental_resistances;
  const isBestiaryUnlocked = localMonster.stage === BESTIARY_FULL_STAGE;

  const handleMarkSoulpit = async () => {
    setIsLoading(true);
    const newState = !localMonster.has_soul;

    setLocalMonster((prev) => ({ ...prev, has_soul: newState }));

    try {
      await updateCharacterBestiaryEntry({
        characterId,
        monsterId: localMonster.id,
        updates: { has_soul: newState },
      });
    } catch {
      setLocalMonster(monster);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkFull = async () => {
    setIsLoading(true);
    const isNowFull = localMonster.stage !== 3;
    const newStage = isNowFull ? 3 : 0;
    const newKills = isNowFull ? localMonster.bestiary_kills.stage3 : 0;

    setLocalMonster((prev) => ({
      ...prev,
      stage: newStage,
      kills: newKills,
    }));

    try {
      await updateCharacterBestiaryEntry({
        characterId,
        monsterId: localMonster.id,
        updates: { stage: newStage, kills: newKills },
      });
    } catch {
      setLocalMonster(monster);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKillsSave = async () => {
    const newKills = Math.max(0, Math.min(editedKills, localMonster.bestiary_kills.stage3));
    const newStage = newKills >= localMonster.bestiary_kills.stage3 ? 3 : localMonster.stage;

    setLocalMonster((prev) => ({ ...prev, kills: newKills, stage: newStage }));
    setIsEditingKills(false);

    try {
      await updateCharacterBestiaryEntry({
        characterId,
        monsterId: localMonster.id,
        updates: { kills: newKills, stage: newStage },
      });
    } catch {
      setLocalMonster(monster);
    }
  };

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
      {isLoading && (
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
          <Typography variant="body2" color="white" fontWeight="bold">
            Updating...
          </Typography>
        </Box>
      )}

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
            onClick={handleMarkSoulpit}
            size="small"
            sx={{ color: localMonster.has_soul ? "#f5b342" : "#666" }}
            disabled={isLoading}
          >
            <AutoAwesomeMosaicOutlined fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title={isBestiaryUnlocked ? "Unmark as fully unlocked" : "Mark as fully unlocked"}>
          <IconButton
            onClick={handleMarkFull}
            size="small"
            sx={{ color: isBestiaryUnlocked ? "lime" : "#666" }}
            disabled={isLoading}
          >
            <Circle fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {localMonster.has_soul && (
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

      <Stack direction="row" spacing={2} alignItems="center">
        <Image
          src={localMonster.image_url}
          alt={localMonster.name}
          width={64}
          height={64}
          className="rounded-md bg-neutral-900 p-1"
        />
        <Stack>
          <Typography variant="h6" fontWeight="bold">
            {localMonster.name}
          </Typography>
          <Typography variant="body2" color="gray">
            {localMonster.bestiary_class}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

      <Stack spacing={0.5}>
        <Typography variant="body2">❤️ HP: {localMonster.hp}</Typography>
        <Typography variant="body2">⭐ XP: {localMonster.exp}</Typography>
        <Typography variant="body2">💎 Charm Points: {localMonster.charm_points}</Typography>
        <Typography variant="body2">⚔️ Difficulty: {localMonster.bestiary_difficulty}</Typography>
      </Stack>

      <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

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
        {isDetailsOpen ? (
          <ExpandLess sx={{ color: "white" }} />
        ) : (
          <ExpandMore sx={{ color: "white" }} />
        )}
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

      <Box sx={{ mt: 1 }}>
        {isEditingKills ? (
          <TextField
            size="small"
            type="number"
            value={editedKills}
            autoFocus
            onChange={(e) => setEditedKills(Number(e.target.value))}
            onBlur={handleKillsSave}
            inputProps={{
              min: 0,
              max: localMonster.bestiary_kills.stage3,
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
            onClick={() => setIsEditingKills(true)}
            sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          >
            📊 Kills: {localMonster.kills} / {localMonster.bestiary_kills.stage3}
          </Typography>
        )}

        <LinearProgress
          variant="determinate"
          value={(localMonster.kills / localMonster.bestiary_kills.stage3) * 100}
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
