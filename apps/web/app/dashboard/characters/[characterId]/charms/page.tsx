import { Box } from "@mui/material";
import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import { fetchCharacterBestiarySummary } from "@/modules/bestiary/server";
import { CharmsCards } from "@/modules/charms/components/CharmsCards";
import { CharmsResetButton } from "@/modules/charms/components/CharmsResetButton";
import { CharmStats } from "@/modules/charms/components/CharmStats";
import {
  fetchCharacterCharmEconomy,
  fetchCharacterCharmsWithProgress,
} from "@/modules/charms/server";

import type { CharacterPageProps } from "../../../types";

export const metadata: Metadata = {
  title: "Charms",
  description: "Manage your character's charms and track your charm points.",
};

export default async function Charms({ params }: CharacterPageProps) {
  const { characterId } = await params;

  const [charms, bestiarySummary, charmEconomy] = await Promise.all([
    fetchCharacterCharmsWithProgress(characterId),
    fetchCharacterBestiarySummary(characterId),
    fetchCharacterCharmEconomy(characterId),
  ]);

  const { unlocked_charm_points, total_charm_points } = bestiarySummary;
  const { major_available, minor_available, major_unlocked } = charmEconomy;
  const progress = total_charm_points > 0 ? (unlocked_charm_points / total_charm_points) * 100 : 0;

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
        totalCharmPoints={total_charm_points}
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
