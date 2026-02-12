import type { PropsWithChildren } from "react";

import { ActiveCharacterProvider, type Character, CharactersProvider } from "@/modules/characters";
import { type AppUser, UserProvider, type UserSetting, UserSettingsProvider } from "@/modules/user";

type DashboardProvidersProps = PropsWithChildren<{
  initialUser: AppUser | null;
  initialSettings: UserSetting | null;
  initialCharacters: Character[];
  initialActiveCharacterId: string | null;
}>;

export function DashboardProviders({
  children,
  initialUser,
  initialSettings,
  initialCharacters,
  initialActiveCharacterId,
}: DashboardProvidersProps) {
  return (
    <UserProvider initialUser={initialUser}>
      <UserSettingsProvider initialSettings={initialSettings}>
        <CharactersProvider initialCharacters={initialCharacters}>
          <ActiveCharacterProvider initialActiveCharacterId={initialActiveCharacterId}>
            {children}
          </ActiveCharacterProvider>
        </CharactersProvider>
      </UserSettingsProvider>
    </UserProvider>
  );
}
