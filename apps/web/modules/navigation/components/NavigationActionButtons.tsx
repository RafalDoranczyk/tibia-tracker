"use client";

import { Box } from "@mui/material";
import { useState } from "react";

import { logout } from "@/actions/auth";
import { TooltipIconButton } from "@/components";
import { type Character, CharacterModal } from "@/modules/characters";
import { useActiveCharacter } from "@/providers/feature/dashboard";

import { CharacterSwitcher } from "./CharacterSwitcher";

type Props = {
  characters: Character[];
};

export function NavigationActionButtons({ characters }: Props) {
  const { activeCharacterId, setActiveCharacterId } = useActiveCharacter();
  const [open, setOpen] = useState(false);

  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <CharacterSwitcher
        characters={characters}
        activeCharacterId={activeCharacterId ?? undefined}
        onSelect={setActiveCharacterId}
      />
      <CharacterModal open={open} onClose={() => setOpen(false)} />
      <TooltipIconButton onClick={logout} variant="logout" />
    </Box>
  );
}
