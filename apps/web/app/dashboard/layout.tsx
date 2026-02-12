import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";

import { loadCharacters } from "@/modules/characters";
import {
  APP_BAR_HEIGHT,
  DESKTOP_APP_NAVIGATION_DRAWER_WIDTH,
  Navigation,
} from "@/modules/navigation";
import { loadUser, loadUserSettings } from "@/modules/user";
import { DashboardProviders } from "@/providers/features/DashboardProviders";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const [user, settings, characters] = await Promise.all([
    loadUser(),
    loadUserSettings(),
    loadCharacters(),
  ]);

  return (
    <DashboardProviders
      initialCharacters={characters}
      initialSettings={settings}
      initialUser={user}
      initialActiveCharacterId={settings?.last_active_character_id ?? null}
    >
      <Navigation />
      <Box ml={{ lg: DESKTOP_APP_NAVIGATION_DRAWER_WIDTH }} mt={APP_BAR_HEIGHT} p={4}>
        {children}
      </Box>
    </DashboardProviders>
  );
}
