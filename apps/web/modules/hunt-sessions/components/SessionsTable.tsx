import { Box } from "@mui/material";

import { Table, type TableOrder, TooltipIconButton } from "@/components";
import { formatDate, formatNumberCompact } from "@/utils";

import { HUNT_SESSIONS_TABLE_HEAD_CELLS } from "../constants";
import type { HuntSessionListItem } from "../schemas";
import { secondsToMinutes } from "../utils/parseSecondsToMinutes";

function formatSessionRow(session: HuntSessionListItem) {
  return {
    date: formatDate(session.date),
    rawXp: formatNumberCompact(session.raw_xp_gain),
    profit: formatNumberCompact(session.profit),
  };
}

type SessionsTableProps = {
  huntSessionList: HuntSessionListItem[];
  count: number;
  page: number;
  rowsPerPage: number;
  order?: TableOrder;
  orderBy?: string;

  onPageChange: (page: number) => void;
  onRowsPerPageChange: (limit: number) => void;
  onSort: (orderBy: TableOrder, property: string) => void;
  onDeleteClick: (session: number) => void;
  onRowClick: (sessionId: number) => void;
};

export function SessionsTable({
  huntSessionList,
  count,
  page,
  rowsPerPage,
  order,
  orderBy,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  onDeleteClick,
  onRowClick,
}: SessionsTableProps) {
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
            const { date, rawXp, profit } = formatSessionRow(session);
            const { id, level, place, duration_seconds } = session;

            return (
              <Table.ZebraRow
                key={id}
                hover
                onClick={() => onRowClick(id)}
                sx={{
                  cursor: "pointer",
                  "& .row-actions": {
                    opacity: 0,
                    pointerEvents: "none",
                    transition: "opacity 0.15s ease",
                  },
                  "&:hover .row-actions": {
                    opacity: 1,
                    pointerEvents: "auto",
                  },
                }}
              >
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>{level}</Table.Cell>
                <Table.Cell>{secondsToMinutes(duration_seconds)}</Table.Cell>
                <Table.Cell>{rawXp}</Table.Cell>
                <Table.Cell>{place.name}</Table.Cell>
                <Table.Cell>{profit}</Table.Cell>

                <Table.Cell align="center" sx={{ width: 60 }}>
                  <Box className="row-actions">
                    <TooltipIconButton
                      variant="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick(session.id);
                      }}
                    />
                  </Box>
                </Table.Cell>
              </Table.ZebraRow>
            );
          })}
        </Table.Body>
      </Table.Root>

      {count > rowsPerPage && (
        <Table.Pagination
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, page) => onPageChange(page)}
          onRowsPerPageChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        />
      )}
    </>
  );
}
