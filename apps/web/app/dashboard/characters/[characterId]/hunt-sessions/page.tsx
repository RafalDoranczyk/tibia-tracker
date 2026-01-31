import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { EmptyState } from "@/components";
import { PageHeader } from "@/layout/page";
import { fetchHuntSessionList, HuntSessionListView } from "@/modules/hunt-sessions";
import { PATHS } from "@/paths";

import type { CharacterPageProps } from "../../../types";

export default async function HuntSessions({ params }: CharacterPageProps) {
  const { characterId } = await params;
  const { data: huntSessionList, count } = await fetchHuntSessionList({
    limit: 10,
    character_id: characterId,
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
          title="No hunt sessions"
        />
      ) : (
        <HuntSessionListView huntSessionList={huntSessionList} count={count} />
      )}
    </Stack>
  );
}
