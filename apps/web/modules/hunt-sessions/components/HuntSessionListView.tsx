"use client";

import { Avatar, Pagination, Stack, Typography } from "@mui/material";
import type { HuntSessionFilters, HuntSessionListItem } from "@repo/database/hunt-sessions";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ConfirmDialog, Table, TooltipIconButton } from "@/components";
import { getPublicAssetUrl } from "@/core/assets";
import { PATHS } from "@/core/paths";
import { usePaginationQueryParams } from "@/hooks";
import { formatDate } from "@/lib/dayjs";
import { useRequiredCharacterId } from "@/modules/characters";
import { formatNumberCompact } from "@/utils";
import { HUNT_SESSIONS_TABLE_HEAD_CELLS } from "../constants";
import { useDeleteHuntSession } from "../hooks/useDeleteHuntSession";
import { parseSecondsToMinutes } from "../utils/parseSecondsToMinutes";

const formatSession = (s: HuntSessionListItem) => ({
  ...s,
  displayDate: formatDate(s.date),
  displayXp: formatNumberCompact(s.raw_xp_per_hour),
  displayProfit: formatNumberCompact(s.profit_per_hour),
  displayDuration: parseSecondsToMinutes(s.duration_seconds),
});

type HuntSessionListViewProps = {
  huntSessionList: HuntSessionListItem[];
  count: number;
  initialFilters: HuntSessionFilters;
};

export function HuntSessionListView({
  huntSessionList,
  count,
  initialFilters,
}: HuntSessionListViewProps) {
  const router = useRouter();
  const characterId = useRequiredCharacterId();
  const [sessionIdToDelete, setSessionIdToDelete] = useState<number | null>(null);

  const { page, limit, sortBy, sortDirection, updatePage, updateSort } =
    usePaginationQueryParams<HuntSessionFilters>({ defaultFilters: initialFilters });

  const { mutate, loading } = useDeleteHuntSession(characterId);

  const totalPages = useMemo(() => Math.ceil(count / limit), [count, limit]);

  const onSort = (property: string) => {
    const isAsc = sortBy === property && sortDirection === "asc";
    updateSort({ sortBy: property, sortDirection: isAsc ? "desc" : "asc" });
  };

  return (
    <>
      <Table.Root>
        <Table.Head
          headCells={HUNT_SESSIONS_TABLE_HEAD_CELLS}
          onRequestSort={(_, prop) => onSort(prop)}
          order={sortDirection || "desc"}
          orderBy={sortBy || "created_at"}
        />

        <Table.Body>
          {huntSessionList.map((session) => {
            const s = formatSession(session);
            return (
              <Table.Row
                key={s.id}
                hover
                onClick={() => router.push(PATHS.CHARACTER(characterId).HUNT_SESSIONS.EDIT(s.id))}
                sx={{
                  cursor: "pointer",
                  "& .delete-btn": { opacity: 0, transition: "0.2s" },
                  "&:hover .delete-btn": { opacity: 1 },
                }}
              >
                <Table.Cell>{s.displayDate}</Table.Cell>
                <Table.Cell>{s.level}</Table.Cell>
                <Table.Cell>{s.displayDuration}</Table.Cell>
                <Table.Cell>{s.displayXp}</Table.Cell>
                <Table.Cell>{s.displayProfit}</Table.Cell>
                <Table.Cell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      src={getPublicAssetUrl(s.place.image_path)}
                      sx={{ width: 28, height: 28 }}
                    >
                      {s.place.name[0]}
                    </Avatar>
                    <Typography variant="body2" fontWeight="medium">
                      {s.place.name}
                    </Typography>
                  </Stack>
                </Table.Cell>

                <Table.Cell align="center">
                  <TooltipIconButton
                    className="delete-btn"
                    variant="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSessionIdToDelete(s.id);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>

      {totalPages > 1 && (
        <Pagination
          sx={{ ml: "auto", mt: 2 }}
          color="secondary"
          variant="outlined"
          shape="rounded"
          count={totalPages}
          page={page}
          onChange={(_, p) => updatePage(p)}
        />
      )}

      <ConfirmDialog.Root
        open={!!sessionIdToDelete}
        onOpenChange={(p) => !p && setSessionIdToDelete(null)}
      >
        <ConfirmDialog.Content>
          <ConfirmDialog.Header
            title="Delete Hunt Session"
            description="Are you sure? This action cannot be undone."
          />
          <ConfirmDialog.Actions>
            <ConfirmDialog.Cancel loading={loading} />
            <ConfirmDialog.Confirm
              loading={loading}
              onClick={async () => {
                if (!sessionIdToDelete) return;
                await mutate(sessionIdToDelete);
                setSessionIdToDelete(null);
              }}
            >
              Delete
            </ConfirmDialog.Confirm>
          </ConfirmDialog.Actions>
        </ConfirmDialog.Content>
      </ConfirmDialog.Root>
    </>
  );
}
