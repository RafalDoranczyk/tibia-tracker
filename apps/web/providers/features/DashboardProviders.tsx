import type { AppUser } from "@repo/database";
import type { PropsWithChildren } from "react";
import { ActiveCharacterContext, type AppCharacter, CharactersContext } from "@/modules/characters";
import { UserProvider } from "@/modules/user";

type DashboardProvidersProps = PropsWithChildren<{
  initialUser: AppUser | null;
  initialCharacters: AppCharacter[];
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
      <CharactersContext initialCharacters={initialCharacters}>
        <ActiveCharacterContext
          initialCharacters={initialCharacters}
          initialActiveCharacterId={initialActiveCharacterId}
        >
          {children}
        </ActiveCharacterContext>
      </CharactersContext>
    </UserProvider>
  );
}
