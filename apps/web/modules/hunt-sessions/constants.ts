import type { TableHeadCell } from "@/components";

export const HUNT_SESSION_PAGINATION_LIMIT = 25;
const HUNT_SESSIONS_TABLE_CELL_WIDTH = 100;

export const HUNT_SESSIONS_TABLE_HEAD_CELLS: TableHeadCell[] = [
  { id: "date", label: "Date", width: HUNT_SESSIONS_TABLE_CELL_WIDTH * 1.5, sortable: true },
  { id: "level", label: "Level", width: HUNT_SESSIONS_TABLE_CELL_WIDTH, sortable: true },
  { id: "time", label: "Time (in minutes)", width: HUNT_SESSIONS_TABLE_CELL_WIDTH },
  {
    id: "raw_xp_gain",
    label: "Raw XP Gain",
    width: HUNT_SESSIONS_TABLE_CELL_WIDTH,
    sortable: true,
  },
  { id: "place", label: "Place", width: HUNT_SESSIONS_TABLE_CELL_WIDTH, sortable: true },
  { id: "profit", label: "Balance", width: HUNT_SESSIONS_TABLE_CELL_WIDTH, sortable: true },
] as const;

export const HUNT_SESSION_PLAYER_OPTIONS = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
];
