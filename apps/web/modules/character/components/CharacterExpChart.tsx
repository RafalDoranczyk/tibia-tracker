"use client";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Divider, Grid, Paper, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import type { HistoryChartUI } from "../types";
import { Overlay } from "./Overlay";

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
};

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 1 }}>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          backgroundColor: `${color}15`,
          color: color,
          display: "flex",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
          {title}
        </Typography>
        <Typography sx={{ fontWeight: 700 }}>{value.toLocaleString()}</Typography>
      </Box>
    </Box>
  );
}

type CharacterExpChartProps = HistoryChartUI & {
  maxRecordDate: string | null;
  maxRecordExp: number | null;
};

export function CharacterExpChart({
  chartPoints,
  summary,
  // maxRecordDate,
  maxRecordExp,
}: CharacterExpChartProps) {
  const theme = useTheme();

  const formatValue = (val: number) =>
    new Intl.NumberFormat("en-US", { notation: "compact" }).format(val);

  return (
    <Paper sx={{ width: "100%", p: 3, position: "relative" }}>
      <Grid container spacing={2}>
        <StatCard
          title="Total Monthly Gain"
          value={summary.totalGained}
          icon={<TrendingUpIcon />}
          color={theme.palette.success.main}
        />

        <StatCard
          title="Best Day Record (Last 30 Days)"
          value={summary.bestDay}
          icon={<StarIcon />}
          color={theme.palette.warning.main}
        />

        <StatCard
          title="Average Daily Exp"
          value={summary.averageGain}
          icon={<CalendarMonthIcon />}
          color={theme.palette.info.main}
        />

        <StatCard
          title="Best Day Record Ever"
          value={maxRecordExp ?? 0}
          icon={<StarIcon />}
          color={theme.palette.warning.main}
        />
      </Grid>

      <Divider sx={{ my: 4, borderStyle: "dashed" }} />

      <Box sx={{ width: "100%", height: 350 }}>
        <BarChart
          dataset={chartPoints}
          xAxis={[
            {
              dataKey: "date",
              scaleType: "band",
              valueFormatter: (date: Date) =>
                date.toLocaleDateString(undefined, { day: "2-digit", month: "short" }),
            },
          ]}
          series={[
            {
              dataKey: "dailyGain",
              label: "Experience",
              color: theme.palette.primary.main,
              valueFormatter: (v) => `${v?.toLocaleString()} exp`,
            },
          ]}
          borderRadius={6}
          yAxis={[{ valueFormatter: formatValue }]}
          margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
        />
      </Box>
      {summary.totalGained === 0 && <Overlay />}
    </Paper>
  );
}
