"use client";

import Add from "@mui/icons-material/Add";
import Settings from "@mui/icons-material/Settings";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import { PATHS } from "@/constants";
import type { Character } from "@/modules/characters";

type CharacterSwitcherProps = {
  characters: Character[];
  activeCharacterId?: string;
  onSelect: (characterId: string) => void;
};

export function CharacterSwitcher({
  characters,
  activeCharacterId,
  onSelect,
}: CharacterSwitcherProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const active = characters.find((c) => c.id === activeCharacterId);
  const noCharacters = characters.length === 0;

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);

  const handleCloseMenu = () => setMenuAnchor(null);

  if (noCharacters) {
    return (
      <Button
        component={Link}
        href={PATHS.CHARACTERS}
        size="small"
        variant="outlined"
        sx={{
          textTransform: "none",
          fontWeight: 500,
          borderColor: "divider",
          minWidth: 160,
          gap: 0.5,
        }}
      >
        <Add fontSize="small" />
        Add your first character
      </Button>
    );
  }

  return (
    <Box>
      <Button
        size="small"
        onClick={handleOpenMenu}
        sx={{
          textTransform: "none",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: 1,
          minWidth: 120,
        }}
      >
        {active ? <Typography color="text.primary">{active.name}</Typography> : "Select character"}
      </Button>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        slotProps={{
          list: {
            dense: true,
          },
          paper: {
            sx: {
              minWidth: 220,
              py: 0.5,
              bgcolor: "background.paper",
              boxShadow: 4,
              borderRadius: 2,
            },
          },
        }}
      >
        {characters.map((char) => (
          <MenuItem
            key={char.id}
            selected={char.id === activeCharacterId}
            onClick={() => {
              handleCloseMenu();
              onSelect(char.id);
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0.25,
              borderRadius: 1,
              mx: 0.5,
              mb: 0.25,
            }}
          >
            <Typography fontWeight={600}>{char.name}</Typography>

            <Typography variant="caption" color="text.secondary">
              {char.vocation} • {char.world}
            </Typography>
          </MenuItem>
        ))}

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            my: 0.5,
          }}
        />

        <MenuItem
          component={Link}
          href={PATHS.CHARACTERS}
          onClick={handleCloseMenu}
          sx={{ gap: 1 }}
        >
          <Settings fontSize="small" color="primary" />
          Manage characters
        </MenuItem>
      </Menu>
    </Box>
  );
}
