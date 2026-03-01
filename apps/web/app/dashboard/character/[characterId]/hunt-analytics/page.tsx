import type { Metadata } from "next";
import { EmptyState } from "@/components";
import { PageHeader } from "@/layout/page/PageHeader";
import { HuntAnalyticsView } from "@/modules/hunt-analytics";
import { loadHuntSpotsAnalytics } from "@/modules/hunt-analytics/server";
import type { CharacterPageProps } from "../../../types";

export const metadata: Metadata = {
  title: "Hunt Analytics",
  description:
    "Manage your character's hunt analytics and find the best places to hunt based on your hunting stats and preferences.",
};

export default async function HuntAnalytics({ params }: CharacterPageProps) {
  const { characterId } = await params;
  const data = await loadHuntSpotsAnalytics(characterId);

  const noData = data.bestXpSpot === undefined && data.bestProfitSpot === undefined;

  return (
    <div>
      <PageHeader
        title="Hunt Analytics"
        description="Your character's hunt analytics can be viewed here. Track your hunting progress and optimize your hunting strategy."
      />
      {noData ? (
        <EmptyState
          variant="hunt"
          title="No hunt analytics found."
          subtitle="Save some session logs to see your hunt analytics here and get insights on your best hunting locations!"
        />
      ) : (
        <HuntAnalyticsView {...data} />
      )}
    </div>
  );
}
