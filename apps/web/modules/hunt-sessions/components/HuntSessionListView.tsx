"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog, Table, TooltipIconButton } from "@/components";
import { PATHS } from "@/core/paths";
import { usePagination } from "@/hooks";
import { formatDate } from "@/lib/dayjs";
import { useRequiredCharacterId } from "@/modules/characters";
import { formatNumberCompact } from "@/utils";
import { HUNT_SESSION_PAGINATION_LIMIT, HUNT_SESSIONS_TABLE_HEAD_CELLS } from "../constants";
import { useDeleteHuntSession } from "../hooks/useDeleteHuntSession";
import type { HuntSessionListItem } from "../schemas";
import { parseSecondsToMinutes } from "../utils/parseSecondsToMinutes";

function formatSessionRow(session: HuntSessionListItem) {
  return {
    date: formatDate(session.date),
    rawXp: formatNumberCompact(session.raw_xp_gain),
    xp: formatNumberCompact(session.xp_gain),
    profit: formatNumberCompact(session.profit),
    duration: parseSecondsToMinutes(session.duration_seconds),
  };
}

type HuntSessionListViewProps = {
  huntSessionList: HuntSessionListItem[];
  count: number;
};

export function HuntSessionListView({ huntSessionList, count }: HuntSessionListViewProps) {
  const router = useRouter();
  const characterId = useRequiredCharacterId();
  const pagination = usePagination({ limit: HUNT_SESSION_PAGINATION_LIMIT });
  const [sessionIdToDelete, setSessionIdToDelete] = useState<number | null>(null);

  const { mutate, loading } = useDeleteHuntSession(characterId);

  const handleDeleteSession = async () => {
    if (!sessionIdToDelete) return;

    await mutate(sessionIdToDelete);
    setSessionIdToDelete(null);
  };

  const handleRowClick = (sessionId: number) => {
    router.push(PATHS.CHARACTER(characterId).HUNT_SESSIONS.EDIT(sessionId));
  };

  const order = "asc";
  const orderBy = "date";

  const onSort = (newOrder: "asc" | "desc", property: string) => {
    // Implement sorting logic here, e.g., update state or call a sorting function
  };

  return (
    <>
      <Table.Root sx={{ maxHeight: 850 }}>
        <Table.Head
          headCells={HUNT_SESSIONS_TABLE_HEAD_CELLS}
          onRequestSort={(_event, property) => {
            const isAsc = orderBy === property && order === "asc";
            onSort(isAsc ? "desc" : "asc", property);
          }}
          order={order}
          orderBy={orderBy}
        />

        <Table.Body>
          {huntSessionList.map((session) => {
            const { date, rawXp, profit, duration, xp } = formatSessionRow(session);
            const { id, level, place } = session;

            return (
              <Table.ZebraRow key={id} hover onClick={() => handleRowClick(id)}>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>{level}</Table.Cell>
                <Table.Cell>{duration}</Table.Cell>
                <Table.Cell>{rawXp}</Table.Cell>
                <Table.Cell>{xp}</Table.Cell>
                <Table.Cell>{profit}</Table.Cell>
                <Table.Cell>{place.name}</Table.Cell>

                <Table.Cell align="center" sx={{ width: 60 }}>
                  <Box>
                    <TooltipIconButton
                      variant="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSessionIdToDelete(session.id);
                      }}
                    />
                  </Box>
                </Table.Cell>
              </Table.ZebraRow>
            );
          })}
        </Table.Body>
      </Table.Root>

      {count > pagination.limitParam && (
        <Table.Pagination
          count={count}
          page={pagination.page}
          rowsPerPage={pagination.limitParam}
          onPageChange={(_, page) => pagination.onParamsChange([{ param: "page", value: page }])}
          onRowsPerPageChange={(event) =>
            pagination.onParamsChange([{ param: "limit", value: parseInt(event.target.value, 10) }])
          }
        />
      )}

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
    </>
  );
}
