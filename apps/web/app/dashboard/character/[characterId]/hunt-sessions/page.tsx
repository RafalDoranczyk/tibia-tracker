import { Button, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import { EmptyState, NextLink } from "@/components";
import { PATHS } from "@/core/paths";
import { PageHeader } from "@/layout/page/PageHeader";
import {
  HuntSessionListView,
  parseHuntSessionFiltersFromSearchParams,
} from "@/modules/hunt-sessions";
import { getHuntSessionList } from "@/modules/hunt-sessions/server";
import type { CharacterPageProps } from "../../../types";

export const metadata: Metadata = {
  title: "Hunt Sessions",
  description:
    "Track and review your hunt sessions to analyze XP/h, profit, and efficiency over time.",
};

export default async function HuntSessions({ params, searchParams }: CharacterPageProps) {
  const { characterId } = await params;
  const filterParams = await searchParams;

  const filters = parseHuntSessionFiltersFromSearchParams(filterParams);

  const { data: huntSessionList, count } = await getHuntSessionList({
    character_id: characterId,
    ...filters,
  });

  return (
    <Stack>
      <PageHeader
        title="Hunt Sessions"
        description="Track and review your hunt sessions to analyze XP/h, profit, and efficiency over time."
        action={
          huntSessionList.length > 0 && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle2" color="text.secondary">
                Showing {huntSessionList.length} of {count} sessions
              </Typography>
              <NewSessionButton characterId={characterId} />
            </Stack>
          )
        }
      />

      {!huntSessionList.length ? (
        <EmptyState
          variant="hunt"
          size="big"
          action={<NewSessionButton characterId={characterId} />}
          subtitle="Start tracking your hunts to analyze your performance and optimize your gameplay!"
          title="You haven't logged any hunt sessions yet. "
        />
      ) : (
        <HuntSessionListView
          initialFilters={filters}
          huntSessionList={huntSessionList}
          count={count}
        />
      )}
    </Stack>
  );
}

function NewSessionButton({ characterId }: { characterId: string }) {
  return (
    <Button
      variant="contained"
      component={NextLink}
      href={PATHS.CHARACTER(characterId).HUNT_SESSIONS.NEW}
    >
      Add Hunt Session
    </Button>
  );
}
