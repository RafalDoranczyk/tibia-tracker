"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

import type { UserSetting } from "../schemas";

const UserSettingsContext = createContext<{
  settings: UserSetting | null;
  setSettings: (settings: UserSetting) => void;
} | null>(null);

export function UserSettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings: UserSetting | null;
  children: ReactNode;
}) {
  const [settings, setSettings] = useState(initialSettings);

  return (
    <UserSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
}

export function useUserSettings() {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error("useUserSettings must be used within a UserSettingsProvider");
  }
  return context;
}
