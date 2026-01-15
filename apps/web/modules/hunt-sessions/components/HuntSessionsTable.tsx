"use client";

import { useRouter } from "next/navigation";

import { Table, type TableHeadCell, type TableOrder, TooltipIconButton } from "@/components";
import { PATHS } from "@/constants";
import { usePagination } from "@/hooks";
import { useRequiredCharacterId } from "@/providers/feature/dashboard";
import { formatDate, formatNumberCompact } from "@/utils";

import type { HuntSession } from "../schemas";

const CELL_WIDTH = 100;

const headCells: TableHeadCell[] = [
  { id: "date", label: "Date", width: CELL_WIDTH * 1.5, sortable: true },
  { id: "level", label: "Level", width: CELL_WIDTH, sortable: true },
  { id: "time", label: "Time (in minutes)", width: CELL_WIDTH, sortable: true },
  {
    id: "raw_xp_gain",
    label: "Raw XP Gain",
    width: CELL_WIDTH,
    sortable: true,
  },
  { id: "place", label: "Place", width: CELL_WIDTH, sortable: true },
  { id: "balance", label: "Balance", width: CELL_WIDTH, sortable: true },
];

type SessionTableProps = {
  huntSessions: HuntSession[];
  onSort: (orderBy: TableOrder, property: string) => void;
  order?: TableOrder;
  orderBy?: string;
  onDeleteClick: (session: HuntSession) => void;
  count: number;
};

export function HuntSessionsTable({
  huntSessions,
  onSort,
  order,
  orderBy,
  count,
  onDeleteClick,
}: SessionTableProps) {
  const router = useRouter();
  const activeCharacterId = useRequiredCharacterId();

  const pagination = usePagination({ limit: 15 });

  const onPageChange = (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    pagination.onPageChange(page);
  };

  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newLimit = Number(event.target.value);
    if (newLimit > 0) {
      pagination.onParamsChange([{ param: "limit", value: newLimit }]);
    }
  };

  const handleRowClick = (sessionId: string | number) => {
    const path = PATHS.CHARACTER(activeCharacterId).HUNT_SESSIONS.EDIT(sessionId);

    router.push(path);
  };

  return (
    <>
      <Table.Root sx={{ maxHeight: 850 }}>
        <Table.Head
          headCells={headCells}
          onRequestSort={(_event, property) => {
            const isAsc = orderBy === property && order === "asc";
            onSort(isAsc ? "desc" : "asc", property);
          }}
          order={order}
          orderBy={orderBy}
        />

        <Table.Body>
          {huntSessions.map((session) => {
            const { id, date, level, place, raw_xp_gain, balance, minutes } = session;

            return (
              <Table.ZebraRow
                key={id}
                hover
                onClick={() => handleRowClick(id)}
                sx={{ cursor: "pointer" }}
              >
                <Table.Cell>{formatDate(date)}</Table.Cell>
                <Table.Cell>{level}</Table.Cell>
                <Table.Cell>{minutes}</Table.Cell>
                <Table.Cell>{formatNumberCompact(raw_xp_gain)}</Table.Cell>
                <Table.Cell>{place.name}</Table.Cell>
                <Table.Cell>{formatNumberCompact(balance)}</Table.Cell>

                <Table.Cell align="center" sx={{ width: 60 }}>
                  <TooltipIconButton
                    variant="delete"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ TERAZ DZIAŁA
                      onDeleteClick(session);
                    }}
                  />
                </Table.Cell>
              </Table.ZebraRow>
            );
          })}
        </Table.Body>
      </Table.Root>

      <Table.Pagination
        count={count}
        page={pagination.page}
        rowsPerPage={pagination.limitParam}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
}

export function SessionTableSkeleton() {
  return <Table.Skeleton rowNumber={10} columnCount={8} showFilters />;
}
