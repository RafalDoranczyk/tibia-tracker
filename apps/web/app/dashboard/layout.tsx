import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";

import { fetchCharacters } from "@/modules/characters/server";
import {
  APP_BAR_HEIGHT,
  DESKTOP_APP_NAVIGATION_DRAWER_WIDTH,
  Navigation,
} from "@/modules/navigation";
import { fetchUser, fetchUserSettings } from "@/modules/user/server";
import { DashboardProviders } from "@/providers/features/DashboardProviders";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const [user, settings, characters] = await Promise.all([
    fetchUser(),
    fetchUserSettings(),
    fetchCharacters(),
  ]);

  return (
    <DashboardProviders
      initialCharacters={characters}
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
