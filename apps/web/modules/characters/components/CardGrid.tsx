"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { alpha, Box, Card, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { MAX_CHARACTERS_PER_USER } from "../constants";
import type { AppCharacter } from "../schemas";
import { AddCharacterCard } from "./AddCharacterCard";
import { CharCard } from "./CharCard";

type CardGridProps = {
  characters: AppCharacter[];
  activeCharacterId: string | null;
  onSelect: (character: AppCharacter) => void;
  onSettings: (character: AppCharacter) => void;
};

export function CardGrid({ characters, onSelect, onSettings, activeCharacterId }: CardGridProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Grid spacing={3} container>
      {characters.map((character) => (
        <Grid size={{ xs: 12, md: 6, lg: 4, xxl: 3 }} key={character.id}>
          <CharCard
            character={character}
            onSelect={onSelect}
            onSettings={onSettings}
            isActive={activeCharacterId === character.id}
          />
        </Grid>
      ))}

      {characters.length < MAX_CHARACTERS_PER_USER && (
        <Grid size={{ xs: 12, md: 6, lg: 4, xxl: 3 }}>
          {isAdding ? (
            <AddCharacterCard onCancel={() => setIsAdding(false)} />
          ) : (
            <Card
              onClick={() => setIsAdding(true)}
              variant="outlined"
              sx={{
                cursor: "pointer",
                height: "100%",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderStyle: "dashed",
                borderWidth: 2,
                backgroundColor: "rgba(255,255,255,0.01)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha("#9c27b0", 0.05),
                  borderColor: "secondary.main",
                  transform: "scale(1.02)",
                  "& .add-icon": {
                    transform: "rotate(90deg)",
                    color: "secondary.main",
                  },
                },
              }}
            >
              <Stack spacing={2} alignItems="center">
                <Box
                  className="add-icon"
                  sx={{ transition: "all 0.4s ease", display: "flex", color: "text.disabled" }}
                >
                  <AddCircleOutlineIcon sx={{ fontSize: 48 }} />
                </Box>
                <Box textAlign="center">
                  <Typography variant="subtitle1" fontWeight={700}>
                    Add Character
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {characters.length} / {MAX_CHARACTERS_PER_USER} slots used
                  </Typography>
                </Box>
              </Stack>
            </Card>
          )}
        </Grid>
      )}
    </Grid>
  );
}
