import { Box } from "@mui/material";
import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import { CharmsCards, CharmsResetButton, CharmStats, loadCharmsPage } from "@/modules/charms";

import type { CharacterPageProps } from "../../../types";

export const metadata: Metadata = {
  title: "Charms",
  description: "Manage your character's charms and track your charm points.",
};

export default async function Charms({ params }: CharacterPageProps) {
  const { characterId } = await params;
  const { charms, charmEconomy, totalCharmPoints, progress } = await loadCharmsPage(characterId);

  const { major_available, minor_available, major_unlocked } = charmEconomy;

  return (
    <>
      <PageHeader
        title="Charms"
        description="Your character charms are based on your bestiary progress and can be managed here.
         Unlock new bestiary to gain more charm points and be able to unlock more charms."
        action={
          <Box ml="auto">
            <CharmsResetButton characterId={characterId} majorCharmsUnlocked={major_unlocked} />
          </Box>
        }
      />

      <CharmStats
        charmEconomy={charmEconomy}
        totalCharmPoints={totalCharmPoints}
        progress={progress}
      />

      <CharmsCards
        availableMajorPoints={major_available}
        availableMinorPoints={minor_available}
        charms={charms}
      />
    </>
  );
}
