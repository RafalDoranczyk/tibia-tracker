import { Box } from "@mui/material";
import type { Metadata } from "next";
import { EmptyState } from "@/components";
import { PageHeader } from "@/layout/page/PageHeader";
import { HuntSpotsView } from "@/modules/hunt-spots";
import { getHuntSpots } from "@/modules/hunt-spots/server";
import type { CharacterPageProps } from "../../../types";

export const metadata: Metadata = {
  title: "Hunt Spots",
  description:
    "Manage your character's hunt spots and find the best places to hunt based on your hunting stats and preferences.",
};

export default async function HuntSpots({ params }: CharacterPageProps) {
  const { characterId } = await params;
  const data = await getHuntSpots(characterId);

  return (
    <Box>
      <PageHeader
        title="Hunt Spots"
        description="Your character's hunt spots can be managed here. Track your hunting progress and optimize your hunting strategy."
      />
      {data.length === 0 ? (
        <EmptyState
          variant="hunt"
          title="No hunt spots found."
          subtitle="Save some session logs to see your hunt spots here and get insights on your best hunting locations!"
        />
      ) : (
        <HuntSpotsView data={data} />
      )}
    </Box>
  );
}
