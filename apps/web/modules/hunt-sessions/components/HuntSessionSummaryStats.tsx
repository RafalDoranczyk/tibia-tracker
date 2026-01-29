import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Paper, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { useHuntStats } from "../hooks/useHuntStats";
import type { HuntSessionFormValues } from "../types";

function SummaryStat({
  title,
  value,
  trend, // number | null
}: {
  title: string;
  value: string | number;
  trend?: number | null;
}) {
  const isPositive = trend != null && trend > 0;
  const isNegative = trend != null && trend < 0;

  return (
    <Paper variant="outlined" sx={{ width: 130, px: 2, py: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {title}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        {isPositive && <ArrowUpwardIcon fontSize="small" sx={{ color: "success.main" }} />}
        {isNegative && <ArrowDownwardIcon fontSize="small" sx={{ color: "error.main" }} />}

        <Typography
          fontWeight={700}
          color={isPositive ? "success.main" : isNegative ? "error.main" : undefined}
        >
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
}

export function HuntSessionSummaryStats() {
  const { getValues } = useFormContext<HuntSessionFormValues>();
  const { rawExpPerHour, expPerHour, profitPerHour, formattedBalance } = useHuntStats();

  return (
    <Stack direction="row" spacing={2} mb={3}>
      <SummaryStat title="Raw XP / h" value={rawExpPerHour} />
      <SummaryStat title="XP / h" value={expPerHour} />
      <SummaryStat title="Profit" value={formattedBalance} trend={getValues("profit")} />
      <SummaryStat title="Profit / h" value={profitPerHour} trend={getValues("profit")} />
    </Stack>
  );
}
