import { Box } from "@mui/material";

import { fetchCharacters } from "@/modules/characters";
import {
  APP_BAR_HEIGHT,
  DESKTOP_APP_NAVIGATION_DRAWER_WIDTH,
  Navigation,
} from "@/modules/navigation";
import { DashboardProviders } from "@/providers/feature/dashboard/DashboardProviders";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ characterId?: string }>;
}) {
  const characters = await fetchCharacters();
  const awaitedParams = await params;
  const initialCharacterId = awaitedParams?.characterId ?? characters[0]?.id ?? null;

  return (
    <DashboardProviders initialCharacterId={initialCharacterId}>
      <Navigation characters={characters} />
      <Box
        ml={{
          lg: DESKTOP_APP_NAVIGATION_DRAWER_WIDTH,
        }}
        mt={APP_BAR_HEIGHT}
        p={4}
      >
        {children}
      </Box>
    </DashboardProviders>
  );
}
