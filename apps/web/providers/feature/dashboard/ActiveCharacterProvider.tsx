"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";

type ActiveCharacterContextType = {
  activeCharacterId: string | null;
  setActiveCharacterId: (id: string | null) => void;
};

const ActiveCharacterContext = createContext<ActiveCharacterContextType | null>(null);

type ActiveCharacterProviderProps = PropsWithChildren<{
  initialCharacterId: string | null;
}>;

export function ActiveCharacterProvider({
  children,
  initialCharacterId,
}: ActiveCharacterProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(initialCharacterId);

  // sync when server changes (navigation / redirect)
  useEffect(() => {
    setActiveCharacterId(initialCharacterId);
  }, [initialCharacterId]);

  const handleSetActive = (id: string | null) => {
    setActiveCharacterId(id);
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
