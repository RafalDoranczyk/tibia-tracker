import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { EmptyState, PageHeader } from "@/components";
import { PATHS } from "@/constants";
import { fetchHuntSessionsList, HuntSessionsView } from "@/modules/hunt-sessions";

import type { CharacterPageProps } from "../../types";

export default async function HuntSessions({ params }: CharacterPageProps) {
  const characterId = (await params).characterId;
  const { data: huntSessions, count } = await fetchHuntSessionsList({
    limit: 10,
    character_id: characterId,
  });

  return (
    <Stack spacing={4}>
      {/* Header row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageHeader.Root
          title="Hunt Sessions"
          description="Track and review your hunt sessions to analyze XP/h, profit, and efficiency over time."
        />

        {huntSessions.length > 0 && (
          <Stack spacing={2} alignItems="flex-end">
            <Typography variant="subtitle2" color="text.secondary">
              Showing {huntSessions.length} of {count} sessions
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

      {!huntSessions.length ? (
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
          type="default"
        />
      ) : (
        <HuntSessionsView huntSessions={huntSessions} count={count} />
      )}
    </Stack>
  );
}
