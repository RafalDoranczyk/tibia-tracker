"use client";

import { Pagination } from "@mui/material";

import { usePaginationQueryParams } from "@/hooks";

type BestiaryPaginationProps = {
  totalPages: number;
};

export function BestiaryPagination({ totalPages }: BestiaryPaginationProps) {
  const { page, updatePage } = usePaginationQueryParams();

  return !totalPages ? null : (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, newPage) => {
        updatePage(newPage);
      }}
    />
  );
}
