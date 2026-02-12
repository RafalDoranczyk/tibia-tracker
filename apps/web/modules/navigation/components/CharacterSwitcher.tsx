"use client";

import Settings from "@mui/icons-material/Settings";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { PATHS } from "@/core/paths";
import { useActiveCharacter, useActiveCharacterDetails, useCharacters } from "@/modules/characters";

export function CharacterSwitcher() {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { characters } = useCharacters();
  const { setActiveCharacterId } = useActiveCharacter();
  const activeCharacter = useActiveCharacterDetails();

  if (!activeCharacter) {
    return (
      <Button component={Link} href={PATHS.CHARACTERS} size="small" variant="outlined">
        Add / Select character
      </Button>
    );
  }

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);

  const handleCloseMenu = () => setMenuAnchor(null);

  const handleClick = (charId: string) => {
    handleCloseMenu();

    if (pathname.includes(PATHS.CHARACTERS)) {
      router.push(PATHS.CHARACTER(charId).OVERVIEW);
    } else {
      setActiveCharacterId(charId);
    }
  };

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
        {activeCharacter ? (
          <Typography color="text.primary">{activeCharacter.name}</Typography>
        ) : (
          "Select character"
        )}
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
            selected={char.id === activeCharacter?.id}
            onClick={() => handleClick(char.id)}
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
