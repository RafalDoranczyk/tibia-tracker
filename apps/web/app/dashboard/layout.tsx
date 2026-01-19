import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";

import { fetchCharacters } from "@/modules/characters";
import {
  APP_BAR_HEIGHT,
  DESKTOP_APP_NAVIGATION_DRAWER_WIDTH,
  Navigation,
} from "@/modules/navigation";
import { DashboardProviders } from "@/providers/feature/dashboard/DashboardProviders";

type DashboardLayoutProps = PropsWithChildren<{
  params: Promise<{ characterId?: string }>;
}>;

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const characters = await fetchCharacters();
  const { characterId } = await params;

  let initialCharacterId = characterId || null;

  if (!initialCharacterId && characters.length) {
    initialCharacterId = characters[0].id;
  }

  return (
    <DashboardProviders initialCharacterId={initialCharacterId}>
      <Navigation characters={characters} />
      <Box ml={{ lg: DESKTOP_APP_NAVIGATION_DRAWER_WIDTH }} mt={APP_BAR_HEIGHT} p={4}>
        {children}
      </Box>
    </DashboardProviders>
  );
}
