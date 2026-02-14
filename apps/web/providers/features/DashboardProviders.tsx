import type { PropsWithChildren } from "react";

import { ActiveCharacterProvider, type Character, CharactersProvider } from "@/modules/characters";
import { type AppUser, UserProvider } from "@/modules/user";

type DashboardProvidersProps = PropsWithChildren<{
  initialUser: AppUser | null;
  initialCharacters: Character[];
  initialActiveCharacterId: string | null;
}>;

export function DashboardProviders({
  children,
  initialUser,
  initialCharacters,
  initialActiveCharacterId,
}: DashboardProvidersProps) {
  return (
    <UserProvider initialUser={initialUser}>
      <CharactersProvider initialCharacters={initialCharacters}>
        <ActiveCharacterProvider
          initialCharacters={initialCharacters}
          initialActiveCharacterId={initialActiveCharacterId}
        >
          {children}
        </ActiveCharacterProvider>
      </CharactersProvider>
    </UserProvider>
  );
}
