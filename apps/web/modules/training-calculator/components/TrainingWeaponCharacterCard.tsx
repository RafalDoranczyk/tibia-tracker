"use client";

import FlashOnIcon from "@mui/icons-material/FlashOn";
import FrontHandOutlined from "@mui/icons-material/FrontHandOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MergeIcon from "@mui/icons-material/Merge";
import SecurityIcon from "@mui/icons-material/Security";
import ShieldIcon from "@mui/icons-material/Shield";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import type { CharacterVocation } from "@/modules/characters";

import {
  LOYALTY_MARKS,
  LOYALTY_POINT_STEP,
  MAX_LOYALTY_POINTS,
  SKILLS_FOR_VOCATION,
} from "../constants";
import type { LoyaltyPointValues, UseOnlineTrainingState } from "../types";

const SECTION_GAP = 2;

const SKILL_CONFIG = {
  melee: { label: "Axe / Club / Sword", icon: <GavelIcon fontSize="small" /> },
  distance: { label: "Distance / Shielding", icon: <MergeIcon fontSize="small" /> },
  ml: { label: "Magic Level", icon: <FlashOnIcon fontSize="small" /> },
  shield: { label: "Shield", icon: <ShieldIcon fontSize="small" /> },
  fist: { label: "Fist", icon: <SportsMmaIcon fontSize="small" /> },
} as const;

type TrainingWeaponCharacterCardProps = {
  weaponsState: UseOnlineTrainingState;
};

export function TrainingWeaponCharacterCard({ weaponsState }: TrainingWeaponCharacterCardProps) {
  const {
    character,
    setVocation,
    setSkill,
    setCurrentSkill,
    setTargetSkill,
    setPercentLeft,
    setLoyalty,
  } = weaponsState;

  const allowedSkills = SKILLS_FOR_VOCATION[character.vocation] || [];

  return (
    <Card sx={{ height: "100%" }} variant="outlined">
      <CardContent>
        <Stack spacing={SECTION_GAP}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main" }} />
            <Typography fontWeight={700}>Character</Typography>
          </Stack>

          {/* Vocation */}
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Vocation
            </Typography>

            <ToggleButtonGroup
              exclusive
              value={character.vocation}
              onChange={(_, v: CharacterVocation) => {
                if (!v || v === character.vocation) return;

                const isAllowed = SKILLS_FOR_VOCATION[v].includes(character.skill);
                if (!isAllowed) setSkill(SKILLS_FOR_VOCATION[v][0]);

                setVocation(v);
              }}
            >
              <ToggleButton value="knight">
                <SecurityIcon fontSize="small" sx={{ mr: 0.5 }} />
                Knight
              </ToggleButton>
              <ToggleButton value="paladin">
                <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                Paladin
              </ToggleButton>
              <ToggleButton value="sorcerer">
                <LocalFireDepartmentIcon fontSize="small" sx={{ mr: 0.5 }} />
                Sorcerer / Druid
              </ToggleButton>
              <ToggleButton value="monk">
                <FrontHandOutlined fontSize="small" sx={{ mr: 0.5 }} />
                Monk
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Skill */}
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Skill
            </Typography>

            <ToggleButtonGroup
              exclusive
              value={character.skill}
              onChange={(_, v) => v && setSkill(v)}
            >
              {allowedSkills.map((skillKey) => {
                const config = SKILL_CONFIG[skillKey as keyof typeof SKILL_CONFIG];
                return (
                  <ToggleButton key={skillKey} value={skillKey}>
                    {config.icon}
                    <Box component="span" sx={{ ml: 0.5 }}>
                      {config.label}
                    </Box>
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Stack>

          {/* Skill values */}
          <Stack direction="row" pt={2} spacing={2}>
            <TextField
              label="Current skill"
              type="number"
              value={character.currentSkill}
              onChange={(e) => setCurrentSkill(Number(e.target.value) || 0)}
              sx={{ width: 140 }}
            />
            <TextField
              label="Target skill"
              type="number"
              value={character.targetSkill}
              onChange={(e) => setTargetSkill(Number(e.target.value) || 0)}
              sx={{ width: 140 }}
            />
          </Stack>

          {/* Percent left */}
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Percent left
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Slider
                value={character.percentLeft}
                min={0}
                max={100}
                step={0.01}
                onChange={(_, v) => setPercentLeft(v as number)}
                sx={{ flex: 1 }}
              />
              <TextField
                type="number"
                size="small"
                value={character.percentLeft}
                onChange={(e) => setPercentLeft(Number(e.target.value) || 0)}
                slotProps={{
                  htmlInput: { min: 0, max: 100, step: 0.01 },
                }}
                sx={{ width: 110 }}
              />
            </Stack>
          </Stack>

          <Divider />

          {/* Loyalty */}
          <Stack p={1.5} spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Loyalty
            </Typography>

            <Slider
              value={character.loyaltyPoints}
              min={0}
              max={MAX_LOYALTY_POINTS}
              step={LOYALTY_POINT_STEP}
              marks={LOYALTY_MARKS}
              onChange={(_, v) => setLoyalty(v as LoyaltyPointValues)}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
