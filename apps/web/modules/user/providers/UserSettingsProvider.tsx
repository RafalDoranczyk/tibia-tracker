"use client";

import { createContext, type PropsWithChildren, useContext, useState } from "react";

import type { UserSetting } from "../schemas/db/user.schema";

type UserSettingsState = UserSetting | null;

const UserSettingsContext = createContext<{
  settings: UserSettingsState;
  setSettings: React.Dispatch<React.SetStateAction<UserSettingsState>>;
} | null>(null);

export function UserSettingsProvider({
  initialSettings,
  children,
}: PropsWithChildren<{ initialSettings: UserSettingsState }>) {
  const [settings, setSettings] = useState<UserSettingsState>(initialSettings);

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
