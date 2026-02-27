import type { TableHeadCell } from "@/components";

export const HUNT_SESSIONS_TABLE_HEAD_CELLS: TableHeadCell[] = [
  {
    id: "date",
    label: "Date",
    width: "15%",
    sortable: true,
  },
  {
    id: "level",
    label: "Lvl",
    width: "8%",
    sortable: true,
  },
  {
    id: "duration_seconds",
    label: "Duration",
    width: "12%",
  },
  {
    id: "raw_xp_per_hour",
    label: "Raw XP/h",
    width: "15%",
    sortable: true,
  },
  {
    id: "profit",
    label: "Profit/h",
    width: "15%",
    sortable: true,
  },
  {
    id: "place",
    label: "Hunt Place",
    width: "30%",
  },
] as const;
