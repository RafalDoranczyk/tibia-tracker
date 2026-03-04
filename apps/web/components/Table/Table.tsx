import {
  Table as MuiTable,
  type TableContainerProps as MuiTableContainerProps,
  TableHead as MuiTableHead,
  type TableProps as MuiTableProps,
  TableRow as MuiTableRow,
  type TableRowProps as MuiTableRowProps,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { forwardRef, type MouseEvent, memo, type ReactNode } from "react";

export type TableOrder = "asc" | "desc";

export interface TableHeadCell {
  id: string;
  label: string;
  width?: number | string;
  sortable?: boolean;
}

interface TableHeadProps {
  headCells: TableHeadCell[];
  order?: TableOrder;
  orderBy?: string;
  onRequestSort?: (event: MouseEvent<unknown>, property: string) => void;
}

interface TableRootProps extends MuiTableContainerProps {
  children: ReactNode;
  tableProps?: MuiTableProps;
}

interface TableRowCustomProps extends MuiTableRowProps {
  zebra?: boolean;
}

// --- COMPONENTS ---

const Root = forwardRef<HTMLDivElement, TableRootProps>(
  ({ children, sx, tableProps, ...props }, ref) => (
    <TableContainer ref={ref} sx={sx} {...props}>
      <MuiTable stickyHeader size="small" {...tableProps}>
        {children}
      </MuiTable>
    </TableContainer>
  )
);

const Head = memo(({ headCells, order, orderBy, onRequestSort }: TableHeadProps) => (
  <MuiTableHead>
    <MuiTableRow>
      {headCells.map((cell) => (
        <TableCell
          key={cell.id}
          sortDirection={orderBy === cell.id ? order : false}
          sx={{ width: cell.width }}
        >
          {cell.sortable ? (
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : "asc"}
              onClick={(e) => onRequestSort?.(e, cell.id)}
            >
              {cell.label}
            </TableSortLabel>
          ) : (
            cell.label
          )}
        </TableCell>
      ))}
      {/* Action cell - keeps alignment consistent with tables having buttons */}
      <TableCell sx={{ width: 60 }} />
    </MuiTableRow>
  </MuiTableHead>
));

const Row = forwardRef<HTMLTableRowElement, TableRowCustomProps>(
  ({ zebra, className, ...props }, ref) => {
    const classes = [zebra ? "zebra" : "", className].filter(Boolean).join(" ");

    return <MuiTableRow ref={ref} className={classes} {...props} />;
  }
);

export const Table = {
  Root,
  Head,
  Body: TableBody,
  Row,
  Cell: TableCell,
  Pagination: TablePagination,
};
