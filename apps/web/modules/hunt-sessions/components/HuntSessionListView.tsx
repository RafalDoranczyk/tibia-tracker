"use client";

import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ConfirmDialog } from "@/components";
import { PATHS } from "@/constants";
import { usePagination } from "@/hooks";
import { useRequiredCharacterId } from "@/providers/feature/dashboard";

import { HUNT_SESSION_PAGINATION_LIMIT } from "../constants";
import { useDeleteHuntSession } from "../hooks/useDeleteHuntSession";
import type { HuntSessionListItem } from "../types";
import { SessionsTable } from "./SessionsTable";

type HuntSessionListViewProps = {
  count: number;
  huntSessionList: HuntSessionListItem[];
};

export function HuntSessionListView({ count, huntSessionList }: HuntSessionListViewProps) {
  const router = useRouter();
  const characterId = useRequiredCharacterId();
  const pagination = usePagination({ limit: HUNT_SESSION_PAGINATION_LIMIT });
  const [sessionIdToDelete, setSessionIdToDelete] = useState<number | null>(null);

  const { mutate, loading } = useDeleteHuntSession();

  const handleDeleteSession = async () => {
    if (!sessionIdToDelete) return;

    await mutate(sessionIdToDelete);
    setSessionIdToDelete(null);
  };

  const handleRowClick = (sessionId: number) => {
    router.push(PATHS.CHARACTER(characterId).HUNT_SESSIONS.EDIT(sessionId));
  };

  return (
    <Stack spacing={3}>
      <SessionsTable
        huntSessionList={huntSessionList}
        page={pagination.page}
        rowsPerPage={pagination.limitParam}
        onPageChange={pagination.onPageChange}
        onRowClick={handleRowClick}
        onDeleteClick={setSessionIdToDelete}
        onSort={() => {
          console.log("on sort");
        }}
        count={count}
        onRowsPerPageChange={(limit) =>
          pagination.onParamsChange([{ param: "limit", value: limit }])
        }
      />

      <ConfirmDialog.Root
        open={sessionIdToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setSessionIdToDelete(null);
        }}
      >
        <ConfirmDialog.Content>
          <ConfirmDialog.Header
            title="Delete Hunt Session"
            description="Are you sure you want to delete this hunt session? This action cannot be undone."
          />
          <ConfirmDialog.Actions>
            <ConfirmDialog.Cancel loading={loading} />

            <ConfirmDialog.Confirm loading={loading} onClick={handleDeleteSession}>
              Delete
            </ConfirmDialog.Confirm>
          </ConfirmDialog.Actions>
        </ConfirmDialog.Content>
      </ConfirmDialog.Root>
    </Stack>
  );
}
