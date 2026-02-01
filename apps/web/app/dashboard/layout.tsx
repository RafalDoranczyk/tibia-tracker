import { Box } from "@mui/material";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { fetchCharacters } from "@/modules/characters";
import {
  APP_BAR_HEIGHT,
  DESKTOP_APP_NAVIGATION_DRAWER_WIDTH,
  Navigation,
} from "@/modules/navigation";
import { getUser } from "@/modules/user";
import { DashboardProviders } from "@/providers/feature/dashboard";

import type { CharacterLayoutProps } from "./types";

export const metadata: Metadata = {
  title: {
    template: "%s | Tibia Tracker",
    default: "Tibia Tracker",
  },
};

type DashboardLayoutProps = PropsWithChildren & CharacterLayoutProps;

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const user = await getUser();
  const characters = await fetchCharacters();
  const { characterId } = await params;

  let initialCharacterId = characterId || null;

  if (!initialCharacterId && characters.length) {
    initialCharacterId = characters[0].id;
  }

  return (
    <DashboardProviders initialUser={user} initialCharacterId={initialCharacterId}>
      <Navigation characters={characters} />
      <Box ml={{ lg: DESKTOP_APP_NAVIGATION_DRAWER_WIDTH }} mt={APP_BAR_HEIGHT} p={4}>
        {children}
      </Box>
    </DashboardProviders>
  );
}
