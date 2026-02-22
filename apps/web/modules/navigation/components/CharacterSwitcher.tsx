"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Settings from "@mui/icons-material/Settings";
import { Avatar, alpha, Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PATHS } from "@/core/paths";
import { type AppCharacter, useActiveCharacter, useCharacters } from "@/modules/characters";

const VOCATION_COLORS: Record<Exclude<AppCharacter["vocation"], undefined>, string> = {
  "Elite Knight": "#ef4444",
  Knight: "#ef4444",
  "Master Sorcerer": "#a855f7",
  Sorcerer: "#a855f7",
  "Elder Druid": "#3b82f6",
  Druid: "#3b82f6",
  "Royal Paladin": "#f59e0b",
  Paladin: "#f59e0b",
  Monk: "#10b981",
  "Exalted Monk": "#10b981",
  none: "#94a3b8",
};

const getVocationInitials = (vocation: string) => {
  if (!vocation || vocation.toLowerCase() === "none") return "?";

  const words = vocation.trim().split(/\s+/);
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  return words[0][0].toUpperCase();
};

export function CharacterSwitcher() {
  const router = useRouter();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const { characters } = useCharacters();
  const { setActiveCharacterId, activeCharacter } = useActiveCharacter();

  if (!activeCharacter) {
    return (
      <Button
        component={Link}
        href={PATHS.CHARACTERS}
        size="small"
        variant="contained"
        sx={{ borderRadius: 2 }}
      >
        Select Character
      </Button>
    );
  }

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);
  const handleCloseMenu = () => setMenuAnchor(null);

  const handleClick = (charId: string) => {
    handleCloseMenu();
    setActiveCharacterId(charId);
    router.push(PATHS.CHARACTER(charId).OVERVIEW);
  };

  const vocationColor = VOCATION_COLORS[activeCharacter.vocation];

  return (
    <Box>
      <Button
        onClick={handleOpenMenu}
        sx={{
          textTransform: "none",
          bgcolor: alpha("#ffffff", 0.03),
          border: "1px solid",
          borderColor: alpha("#ffffff", 0.1),
          borderRadius: 2,
          px: 2,
          py: 0.75,
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: alpha("#ffffff", 0.07),
            borderColor: alpha(vocationColor, 0.4),
          },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: "0.75rem",
              fontWeight: 800,
              bgcolor: alpha(vocationColor, 0.2),
              color: vocationColor,
              border: `1px solid ${alpha(vocationColor, 0.5)}`,
            }}
          >
            {getVocationInitials(activeCharacter.vocation)}
          </Avatar>

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.2 }}>
              {activeCharacter.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "block",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Lvl {activeCharacter.level} • {activeCharacter.world}
            </Typography>
          </Box>

          <KeyboardArrowDownIcon
            sx={{
              fontSize: 18,
              color: "text.disabled",
              transition: "transform 0.2s",
              transform: menuAnchor ? "rotate(180deg)" : "none",
            }}
          />
        </Stack>
      </Button>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 240,
              mt: 1,
              bgcolor: "#1a1a24",
              backgroundImage: "none",
              border: "1px solid",
              borderColor: alpha("#ffffff", 0.1),
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              borderRadius: 2,
            },
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 1,
            display: "block",
            color: "text.disabled",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          YOUR CHARACTERS
        </Typography>

        {characters.map((char) => {
          const isSelected = char.id === activeCharacter.id;
          const charVocationColor = VOCATION_COLORS[char.vocation] || "#94a3b8";

          return (
            <MenuItem
              key={char.id}
              selected={isSelected}
              onClick={() => handleClick(char.id)}
              sx={{
                py: 1.5,
                px: 2,
                mx: 1,
                borderRadius: 1.5,
                border: "1px solid transparent",
                "&.Mui-selected": {
                  bgcolor: alpha(charVocationColor, 0.1),
                  borderColor: alpha(charVocationColor, 0.2),
                  "&:hover": { bgcolor: alpha(charVocationColor, 0.15) },
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "100%" }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: charVocationColor,
                    boxShadow: `0 0 8px ${charVocationColor}`,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={isSelected ? 700 : 500}>
                    {char.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Lvl {char.level} • {char.vocation}
                  </Typography>
                </Box>
              </Stack>
            </MenuItem>
          );
        })}

        <Box sx={{ borderTop: "1px solid", borderColor: alpha("#ffffff", 0.05), my: 1 }} />

        <MenuItem
          component={Link}
          href={PATHS.CHARACTERS}
          onClick={handleCloseMenu}
          sx={{ py: 1.5, mx: 1, borderRadius: 1.5, gap: 1.5, color: "primary.light" }}
        >
          <Settings fontSize="small" />
          <Typography variant="body2" fontWeight={600}>
            Manage Characters
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
