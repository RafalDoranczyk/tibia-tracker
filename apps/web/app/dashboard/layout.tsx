import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";

import {
  APP_BAR_HEIGHT,
  DESKTOP_APP_NAVIGATION_DRAWER_WIDTH,
  Navigation,
} from "@/modules/navigation";
import { loadUser } from "@/modules/user";
import { DashboardProviders } from "@/providers/dashboard/DashboardProviders";

import type { CharacterLayoutProps } from "./types";

export default async function DashboardLayout({
  children,
  params,
}: PropsWithChildren<CharacterLayoutProps>) {
  const { characterId } = await params;
  const { user, settings, characters } = await loadUser();

  const initialActiveCharacterId = characterId ?? settings?.last_active_character_id ?? null;

  return (
    <DashboardProviders
      initialCharacters={characters}
      initialSettings={settings}
      initialUser={user}
      initialActiveCharacterId={initialActiveCharacterId}
    >
      <Navigation />
      <Box ml={{ lg: DESKTOP_APP_NAVIGATION_DRAWER_WIDTH }} mt={APP_BAR_HEIGHT} p={4}>
        {children}
      </Box>
    </DashboardProviders>
  );
}
