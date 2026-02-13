import { Button, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import Link from "next/link";

import { EmptyState } from "@/components";
import { PATHS } from "@/core/paths";
import { PageHeader } from "@/layout/page";
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
  const search = await searchParams;

  const filters = parseHuntSessionFiltersFromSearchParams(search);

  const { data: huntSessionList, count } = await getHuntSessionList({
    character_id: characterId,
    filters,
  });

  return (
    <Stack spacing={4}>
      {/* Header row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageHeader
          title="Hunt Sessions"
          description="Track and review your hunt sessions to analyze XP/h, profit, and efficiency over time."
        />

        {huntSessionList.length > 0 && (
          <Stack spacing={2} alignItems="flex-end">
            <Typography variant="subtitle2" color="text.secondary">
              Showing {huntSessionList.length} of {count} sessions
            </Typography>

            <Button
              variant="contained"
              component={Link}
              href={PATHS.CHARACTER(characterId).HUNT_SESSIONS.NEW}
            >
              Add Hunt Session
            </Button>
          </Stack>
        )}
      </Stack>

      {!huntSessionList.length ? (
        <EmptyState
          variant="hunt"
          size="big"
          action={
            <Button
              variant="contained"
              component={Link}
              href={PATHS.CHARACTER(characterId).HUNT_SESSIONS.NEW}
            >
              Add Hunt Session
            </Button>
          }
          subtitle="Start tracking your hunts to analyze your performance and optimize your gameplay!"
          title="You haven't logged any hunt sessions yet. "
        />
      ) : (
        <HuntSessionListView huntSessionList={huntSessionList} count={count} />
      )}
    </Stack>
  );
}
