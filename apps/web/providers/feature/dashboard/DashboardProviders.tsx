import type { PropsWithChildren } from "react";

import { type AppUser, UserProvider } from "@/modules/user";

import { ActiveCharacterProvider } from "./ActiveCharacterProvider";

type DashboardProvidersProps = PropsWithChildren<{
  initialUser: AppUser | null;
  // Initial id of the active character to set on load
  initialCharacterId: string | null;
}>;

export function DashboardProviders({
  children,
  initialUser,
  initialCharacterId,
}: DashboardProvidersProps) {
  return (
    <UserProvider initialUser={initialUser}>
      <ActiveCharacterProvider initialCharacterId={initialCharacterId}>
        {children}
      </ActiveCharacterProvider>
    </UserProvider>
  );
}
