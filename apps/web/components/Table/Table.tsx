import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  type TableBodyProps,
  TableCell as MuiTableCell,
  type TableCellProps,
  TableContainer,
  type TableContainerOwnProps,
  TableHead as MuiTableHead,
  TablePagination as MuiTablePagination,
  TableRow as MuiTableRow,
  type TableRowProps,
  TableSortLabel,
  type Theme,
} from "@mui/material";
import type { PropsWithChildren } from "react";
import { memo, useCallback, useMemo } from "react";

import { TableSkeleton } from "./TableSkeleton";

export type TableOrder = "asc" | "desc";

export type TableHeadCell = {
  id: string;
  label: string;
  width: number;
  sortable?: boolean;
};

type TableHeadProps = {
  headCells: TableHeadCell[];
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
  order?: TableOrder;
  orderBy?: string;
};

type TablePaginationProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rowsPerPageOptions?: number[];
};

// ✅ Memoized TableRoot with optimized sx
const TableRoot = memo(function TableRoot({
  children,
  ...props
}: PropsWithChildren<TableContainerOwnProps>) {
  // ✅ Memoize expensive sx object
  const containerSx = useMemo(
    () => ({
      "::-webkit-scrollbar": {
        width: "10px",
      },
      "::-webkit-scrollbar-thumb": {
        background: ({ palette }: Theme) => palette.primary.dark,
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: (theme: Theme) => theme.palette.primary.main,
      },
      "::-webkit-scrollbar-track": {
        background: ({ palette }: Theme) => palette.primary.light,
      },
      ...props.sx,
    }),
    [props.sx]
  );

  // ✅ Memoize table sx
  const tableSx = useMemo(
    () => ({
      minWidth: 750,
      tableLayout: "fixed" as const,
    }),
    []
  );

  return (
    <TableContainer sx={containerSx}>
      <MuiTable aria-labelledby="table" stickyHeader sx={tableSx}>
        {children}
      </MuiTable>
    </TableContainer>
  );
});

// ✅ Memoized TableHead to prevent unnecessary re-renders
const TableHead = memo(function TableHead({
  headCells,
  onRequestSort,
  order,
  orderBy,
}: TableHeadProps) {
  // ✅ Memoize expensive operations
  const headerCellSx = useMemo(
    () => ({
      background: ({ palette }: Theme) => palette.background.paper,
    }),
    []
  );

  const actionCellSx = useMemo(
    () => ({
      background: ({ palette }: Theme) => palette.background.paper,
      width: 60,
    }),
    []
  );

  // ✅ Memoize sort handler to prevent child re-renders
  const handleSort = useCallback(
    (cellId: string) => (e: React.MouseEvent<unknown>) => {
      if (onRequestSort) {
        onRequestSort(e, cellId);
      }
    },
    [onRequestSort]
  );

  return (
    <MuiTableHead>
      <MuiTableRow>
        {headCells.map(({ id, label, width, sortable = false }) => (
          <MuiTableCell
            key={id}
            sortDirection={orderBy === id ? order : false}
            sx={{
              ...headerCellSx,
              width,
            }}
          >
            <TableSortLabel
              disabled={!sortable}
              active={orderBy === id}
              direction={orderBy === id ? order : "asc"}
              onClick={handleSort(id)}
            >
              {label}
            </TableSortLabel>
          </MuiTableCell>
        ))}
        <MuiTableCell sx={actionCellSx} />
      </MuiTableRow>
    </MuiTableHead>
  );
});

// ✅ Memoized TableBody
const TableBody = memo(function TableBody({ children, ...props }: TableBodyProps) {
  return <MuiTableBody {...props}>{children}</MuiTableBody>;
});

// ✅ Memoized TableRow
const TableRow = memo(function TableRow({ children, ...props }: TableRowProps) {
  return <MuiTableRow {...props}>{children}</MuiTableRow>;
});

// ✅ Memoized TableCell
const TableCell = memo(function TableCell({ children, ...props }: TableCellProps) {
  return <MuiTableCell {...props}>{children}</MuiTableCell>;
});

// ✅ Optimized ZebraRow with memoized sx
const ZebraRow = memo(function ZebraRow({ children, ...props }: TableRowProps) {
  // ✅ Memoize complex sx object
  const zebraSx = useMemo(
    () => ({
      "&:nth-of-type(even)": {
        backgroundColor: "rgba(255, 255, 255, 0.02)",
      },
      "&:hover": {
        backgroundColor: "action.hover !important",
      },
      "&:hover .delete-button-cell": {
        opacity: 1,
        visibility: "visible",
      },
      "&:hover svg.MuiSvgIcon-root": {
        opacity: 1,
      },
      cursor: "pointer",
      ...props.sx,
    }),
    [props.sx]
  );

  return (
    <Table.Row sx={zebraSx} {...props}>
      {children}
    </Table.Row>
  );
});

// ✅ Memoized TablePagination
const TablePagination = memo(function TablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
}: TablePaginationProps) {
  return (
    <MuiTablePagination
      count={count}
      component="div"
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      showFirstButton
      showLastButton
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
});

export const Table = {
  Root: TableRoot,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  ZebraRow: ZebraRow,
  Pagination: TablePagination,
  Skeleton: TableSkeleton,
};
