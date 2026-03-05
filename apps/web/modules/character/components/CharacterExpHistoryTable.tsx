"use client";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Stack, Typography } from "@mui/material";
import { Table } from "@/components";
import { formatDate } from "@/lib/dayjs";

interface ExpHistoryEntry {
  recorded_at: string;
  level: number;
  experience: number;
  rank: number;
}

const EXP_HISTORY_HEAD_CELLS = [
  { id: "recorded_at", label: "Date", width: "20%" },
  { id: "exp_change", label: "Exp Change", width: "25%" },
  { id: "rank", label: "Vocation Rank", width: "20%" },
  { id: "level", label: "Lvl", width: "15%" },
  { id: "experience", label: "Total Experience", width: "20%" },
];

const getColorForExpChange = (change: number) => {
  if (change > 0) return "success.main";
  if (change < 0) return "error.main";
  return "text.secondary";
};

function LevelChangeIndicator({ levelGain }: { levelGain: number }) {
  const isLoss = levelGain < 0;
  const colorKey = isLoss ? "error" : "success";

  return (
    <Typography
      variant="caption"
      sx={{
        color: (t) => t.palette.getContrastText(t.palette[colorKey].dark),
        backgroundColor: (t) => t.palette[colorKey].dark,
        px: 0.5,
        py: 0.1,
        borderRadius: 1,
        fontWeight: "bold",
      }}
    >
      {levelGain > 0 ? `+${levelGain}` : levelGain}
    </Typography>
  );
}

export function CharacterExpHistoryTable({ logs }: { logs: ExpHistoryEntry[] }) {
  return (
    <Table.Root>
      <Table.Head headCells={EXP_HISTORY_HEAD_CELLS} />
      <Table.Body>
        {logs.map((entry, index) => {
          // data is DESC (newest first), so "previous" day is index + 1
          const prevEntry = logs[index + 1];

          const expChange = prevEntry ? entry.experience - prevEntry.experience : 0;
          const levelGain = prevEntry ? entry.level - prevEntry.level : 0;
          const rankDiff = prevEntry ? prevEntry.rank - entry.rank : 0;

          return (
            <Table.Row key={entry.recorded_at}>
              {/* Date */}
              <Table.Cell>{formatDate(entry.recorded_at, "MM DD")}</Table.Cell>

              {/* Exp Change */}
              <Table.Cell>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ color: getColorForExpChange(expChange) }}
                >
                  {expChange > 0 ? `+${expChange.toLocaleString()}` : "0"}
                </Typography>
              </Table.Cell>

              {/* Vocation Rank */}
              <Table.Cell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">{entry.rank}</Typography>
                  {rankDiff !== 0 && (
                    <Stack direction="row" alignItems="center" sx={{ opacity: 0.8 }}>
                      {rankDiff > 0 ? (
                        <ArrowUpwardIcon sx={{ fontSize: 14, color: "success.main" }} />
                      ) : (
                        <ArrowDownwardIcon sx={{ fontSize: 14, color: "error.main" }} />
                      )}
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        sx={{ color: rankDiff > 0 ? "success.main" : "error.main" }}
                      >
                        {Math.abs(rankDiff)}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Table.Cell>

              {/* Level and Total Experience */}
              <Table.Cell>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography variant="body2" fontWeight="medium">
                    {entry.level}
                  </Typography>
                  {levelGain !== 0 && <LevelChangeIndicator levelGain={levelGain} />}
                </Stack>
              </Table.Cell>

              {/* Experience */}
              <Table.Cell>
                <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                  {entry.experience.toLocaleString()}
                </Typography>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
