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
import { updateLastActiveCharacter } from "@/modules/user/actions";
import type { AppCharacter } from "../types";

type ContextCharacterId = string | null;

type ActiveCharacterContextType = {
  activeCharacter: AppCharacter | null;
  setActiveCharacterId: (id: ContextCharacterId) => void;
};

const ActiveCharacterContextType = createContext<ActiveCharacterContextType | null>(null);

type ActiveCharacterProviderProps = PropsWithChildren<{
  initialActiveCharacterId: ContextCharacterId;
  initialCharacters: AppCharacter[];
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
    if (!id || id === activeCharacterId) return;

    try {
      setActiveCharacterId(id);
      await updateLastActiveCharacter(id);
    } catch {
      toast.error("Failed to switch character");
    }
  };

  return (
    <ActiveCharacterContextType.Provider
      value={{
        activeCharacter,
        setActiveCharacterId: handleSetActive,
      }}
    >
      {children}
    </ActiveCharacterContextType.Provider>
  );
}

export function useActiveCharacter() {
  const ctx = useContext(ActiveCharacterContextType);
  if (!ctx) throw new Error("useActiveCharacter must be used within ActiveCharacterContext");
  return ctx;
}

export function useRequiredCharacterId(): string {
  const { activeCharacter } = useActiveCharacter();
  if (!activeCharacter) throw new Error("Active character is not set.");

  return activeCharacter.id;
}
