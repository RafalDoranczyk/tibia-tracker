import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AIActionButton } from "@/components";
import { useHuntStats } from "../hooks/useHuntStats";
import type { HuntSessionForm, MonsterPreview, PreyBonus } from "../schemas";

type SummaryStatProps = {
  title: string;
  value: string | number;
  trend?: number | null;
};

function SummaryStat({ title, value, trend }: SummaryStatProps) {
  const isPositive = trend != null && trend > 0;
  const isNegative = trend != null && trend < 0;

  return (
    <Paper variant="outlined" sx={{ minWidth: 100, px: 2, py: 1.2 }}>
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

type SummaryStatsProps = {
  preyBonusList: PreyBonus[];
  monsterList: MonsterPreview[];
  setScanModal: () => void;
};

export function SummaryStats({ preyBonusList, monsterList, setScanModal }: SummaryStatsProps) {
  const { getValues } = useFormContext<HuntSessionForm>();
  const { rawExpPerHour, expPerHour, profitPerHour, formattedBalance, preysWithMonster } =
    useHuntStats({ preyBonusList, monsterList });

  return (
    <Paper
      variant="outlined"
      sx={{
        position: "sticky",
        top: 72,
        zIndex: 10,
        backdropFilter: "blur(12px)",
        background: "linear-gradient(to bottom, rgba(12,12,20,0.85), rgba(12,12,20,0.6))",
        p: 1.5,
        borderRadius: 2,
      }}
    >
      <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center">
        <SummaryStat title="Raw XP / h" value={rawExpPerHour} />
        <SummaryStat title="XP / h" value={expPerHour} />
        <SummaryStat title="Profit" value={formattedBalance} trend={getValues("profit")} />
        <SummaryStat title="Profit / h" value={profitPerHour} trend={getValues("profit")} />

        {preysWithMonster.map((prey) => (
          <Paper
            key={prey.preyBonus?.id}
            variant="outlined"
            sx={{
              minWidth: 140,
              px: 1.5,
              py: 1,
            }}
          >
            <Stack height="100%" direction="row" spacing={1} alignItems="center">
              <Avatar
                alt={prey.monster?.name}
                variant="rounded"
                src={prey.monster?.image_path}
                sx={{ width: 36, height: 36 }}
              />
              <Typography variant="caption" noWrap>
                {prey.preyBonus?.description}
              </Typography>
            </Stack>
          </Paper>
        ))}

        <AIActionButton onClick={setScanModal} sx={{ ml: "auto" }}>
          Upload Screenshoot
        </AIActionButton>
      </Stack>
    </Paper>
  );
}
