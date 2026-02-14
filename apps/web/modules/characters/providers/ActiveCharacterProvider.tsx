"use client";

import { useParams } from "next/navigation";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useToast } from "@/hooks";
import { updateLastActiveCharacter } from "@/modules/user/actions/update-last-active-character";

import type { Character } from "../schemas";

type ContextCharacterId = string | null;

type ActiveCharacterContextType = {
  activeCharacter: Character | null;
  setActiveCharacterId: (id: ContextCharacterId) => void;
};

const ActiveCharacterContext = createContext<ActiveCharacterContextType | null>(null);

type ActiveCharacterProviderProps = PropsWithChildren<{
  initialActiveCharacterId: ContextCharacterId;
  initialCharacters: Character[];
}>;

export function ActiveCharacterProvider({
  children,
  initialActiveCharacterId,
  initialCharacters,
}: ActiveCharacterProviderProps) {
  const toast = useToast();
  const { characterId } = useParams<{ characterId?: string }>();

  const [activeCharacterId, setActiveCharacterId] =
    useState<ContextCharacterId>(initialActiveCharacterId);

  useEffect(() => {
    if (characterId && characterId !== activeCharacterId) {
      setActiveCharacterId(characterId);
    }
  }, [characterId, activeCharacterId]);

  const activeCharacter = useMemo(() => {
    if (!activeCharacterId) return null;
    return initialCharacters.find((c) => c.id === activeCharacterId) ?? null;
  }, [activeCharacterId, initialCharacters]);

  const handleSetActive = async (id: ContextCharacterId) => {
    if (id === activeCharacterId) return;

    setActiveCharacterId(id);

    if (id) {
      try {
        await updateLastActiveCharacter(id);
        toast.success(
          "You switched active character. All character-related features will now use this character."
        );
      } catch {
        toast.error("Failed to sync active character to DB.");
      }
    }
  };

  return (
    <ActiveCharacterContext.Provider
      value={{
        activeCharacter,
        setActiveCharacterId: handleSetActive,
      }}
    >
      {children}
    </ActiveCharacterContext.Provider>
  );
}

export function useActiveCharacter() {
  const ctx = useContext(ActiveCharacterContext);
  if (!ctx) throw new Error("useActiveCharacter must be used within ActiveCharacterProvider");
  return ctx;
}

export function useRequiredCharacterId(): string {
  const { activeCharacter } = useActiveCharacter();
  if (!activeCharacter) throw new Error("Active character is not set.");

  return activeCharacter.id;
}
