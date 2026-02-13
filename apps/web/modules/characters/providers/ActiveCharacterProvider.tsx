"use client";

import { useParams } from "next/navigation";
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";

import { usePersistActiveCharacter } from "@/modules/user";

type ContextCharacterId = string | null;

type ActiveCharacterContextType = {
  activeCharacterId: ContextCharacterId;
  setActiveCharacterId: (id: ContextCharacterId) => void;
};

const ActiveCharacterContext = createContext<ActiveCharacterContextType | null>(null);

type ActiveCharacterProviderProps = PropsWithChildren<{
  initialActiveCharacterId: ContextCharacterId;
}>;

export function ActiveCharacterProvider({
  children,
  initialActiveCharacterId,
}: ActiveCharacterProviderProps) {
  const { characterId } = useParams<{ characterId?: string }>();
  const persistActiveCharacter = usePersistActiveCharacter();

  const [activeCharacterId, setActiveCharacterId] =
    useState<ContextCharacterId>(initialActiveCharacterId);

  useEffect(() => {
    if (characterId && characterId !== activeCharacterId) {
      setActiveCharacterId(characterId);
    }
  }, [characterId, activeCharacterId]);

  const handleSetActive = async (id: ContextCharacterId) => {
    if (id === activeCharacterId) return;

    setActiveCharacterId(id);

    if (id) {
      await persistActiveCharacter(id);
    }
  };

  return (
    <ActiveCharacterContext.Provider
      value={{
        activeCharacterId,
        setActiveCharacterId: handleSetActive,
      }}
    >
      {children}
    </ActiveCharacterContext.Provider>
  );
}

export function useActiveCharacter() {
  const ctx = useContext(ActiveCharacterContext);
  if (!ctx) {
    throw new Error("useActiveCharacter must be used within ActiveCharacterProvider");
  }
  return ctx;
}

export function useRequiredCharacterId(): string {
  const { activeCharacterId } = useActiveCharacter();

  if (!activeCharacterId) {
    throw new Error("Active character is not set.");
  }

  return activeCharacterId;
}
