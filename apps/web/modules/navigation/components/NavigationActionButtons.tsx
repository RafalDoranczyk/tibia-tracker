"use client";

import { Box } from "@mui/material";

import { TooltipIconButton } from "@/components";
import type { Character } from "@/modules/characters";
import { logout } from "@/modules/user";
import { useActiveCharacter } from "@/providers/feature/dashboard";

import { CharacterSwitcher } from "./CharacterSwitcher";

type NavigationActionButtonsProps = {
  characters?: Character[];
};

export function NavigationActionButtons({ characters }: NavigationActionButtonsProps) {
  const { activeCharacterId, setActiveCharacterId } = useActiveCharacter();

  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      {characters && (
        <>
          <CharacterSwitcher
            characters={characters}
            activeCharacterId={activeCharacterId ?? undefined}
            onSelect={setActiveCharacterId}
          />

          <TooltipIconButton onClick={logout} variant="logout" />
        </>
      )}
    </Box>
  );
}
