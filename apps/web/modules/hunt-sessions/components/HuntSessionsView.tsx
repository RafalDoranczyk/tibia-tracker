"use client";

import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useState, useTransition } from "react";

import { ConfirmDialog, EmptyState } from "@/components";
import { PATHS } from "@/constants";
import type { Monster } from "@/modules/bestiary";
import { useRequiredCharacterId } from "@/providers/feature/dashboard";

import { deleteHuntSession } from "../actions/deleteHuntSession";
import type { HuntSession } from "../schemas";
import { HuntSessionsTable } from "./HuntSessionsTable";

type HuntSessionsViewProps = {
  count: number;
  huntSessions: HuntSession[];
  monsters: Monster[];
};

export function HuntSessionsView({ count, huntSessions }: HuntSessionsViewProps) {
  const [sessionToDelete, setSessionToDelete] = useState<HuntSession | null>(null);

  const [isPending, startTransition] = useTransition();
  const characterId = useRequiredCharacterId();

  const handleDeleteSession = () =>
    startTransition(async () => {
      try {
        if (!sessionToDelete) return;

        await deleteHuntSession({ id: sessionToDelete.id, characterId });
        setSessionToDelete(null);
      } catch (err) {
        console.error("Failed to create session:", err);
      }
    });

  if (huntSessions.length === 0) {
    return (
      <EmptyState
        size="big"
        action={
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href={PATHS.CHARACTER(characterId).HUNT_SESSIONS.NEW}
          >
            Add Hunt Session
          </Button>
        }
        title="No hunt sessions"
        type="history"
      />
    );
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Hunt Sessions
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href={PATHS.CHARACTER(characterId).HUNT_SESSIONS.NEW}
        >
          Add Hunt Session
        </Button>
      </Stack>

      <HuntSessionsTable
        onDeleteClick={setSessionToDelete}
        count={count}
        huntSessions={huntSessions}
        onSort={() => {
          console.log("on sort");
        }}
      />

      <ConfirmDialog.Root
        open={sessionToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setSessionToDelete(null);
        }}
      >
        <ConfirmDialog.Content>
          <ConfirmDialog.Header
            title="Delete Hunt Session"
            description="Are you sure you want to delete this hunt session? This action cannot be undone."
          />
          <ConfirmDialog.Actions>
            <LoadingButton loading={isPending} onClick={() => setSessionToDelete(null)}>
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={isPending}
              color="error"
              variant="contained"
              onClick={handleDeleteSession}
            >
              Delete
            </LoadingButton>
          </ConfirmDialog.Actions>
        </ConfirmDialog.Content>
      </ConfirmDialog.Root>
    </>
  );
}
