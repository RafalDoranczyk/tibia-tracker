"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type ActiveCharacterContextType = {
  activeCharacterId: string | null;
  setActiveCharacterId: (id: string | null) => void;
};

const STORAGE_KEY = "active_character_id";
const ActiveCharacterContext = createContext<ActiveCharacterContextType | null>(null);

export function ActiveCharacterProvider({
  children,
  initialCharacterId = null,
}: {
  children: React.ReactNode;
  initialCharacterId: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(initialCharacterId);

  useEffect(() => {
    if (initialCharacterId !== null) {
      setActiveCharacterId(initialCharacterId);
      localStorage.setItem(STORAGE_KEY, initialCharacterId);
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && !activeCharacterId) {
      setActiveCharacterId(saved);
    }
  }, [initialCharacterId, activeCharacterId]);

  const handleSetActive = (id: string | null) => {
    setActiveCharacterId(id);

    if (id === null) {
      localStorage.removeItem(STORAGE_KEY);
      router.push("/dashboard/characters");
      return;
    }

    localStorage.setItem(STORAGE_KEY, id);

    const updatedPath = pathname.replace(/\/characters\/[^/]+/, `/characters/${id}`);

    router.push(updatedPath);
  };

  return (
    <ActiveCharacterContext.Provider
      value={{ activeCharacterId, setActiveCharacterId: handleSetActive }}
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

export function useRequiredCharacterId() {
  const { activeCharacterId } = useActiveCharacter();
  if (!activeCharacterId) {
    throw new Error(
      "useRequiredCharacterId() called without an active character. Ensure server redirect/select sets initialCharacterId."
    );
  }
  return activeCharacterId;
}
