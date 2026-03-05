import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import { alpha, Box, Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { IMBUING_CONFIG } from "../constants";
import { ITEM_IMAGES } from "../images";
import type { ScrollEconomyResult } from "../utils/calculateScrollEconomy";

function SummaryRow({
  label,
  value,
  color,
  isBold,
}: {
  label: string;
  value: number;
  color?: string;
  isBold?: boolean;
}) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ py: 0.25 }}>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", fontSize: "0.7rem", textTransform: "uppercase" }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontWeight: isBold ? 700 : 500,
          color: color,
          fontFamily: "monospace",
          fontSize: "0.95rem",
        }}
      >
        {value.toLocaleString()}
      </Typography>
    </Box>
  );
}

type ScrollCardSummaryProps = {
  economy: ScrollEconomyResult;
  showTokenStrategies: boolean;
};

export function ScrollCardSummary({ economy, showTokenStrategies }: ScrollCardSummaryProps) {
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        height: "100%",
        backgroundColor: alpha(theme.palette.background.paper, 0.4),
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
        <ShoppingBasket sx={{ fontSize: 18, color: "primary.main" }} />
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: "0.75rem" }}
        >
          Market Materials
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <SummaryRow label="Materials Cost" value={economy.itemsTotalCost} />
        <SummaryRow label="Total Cost" value={economy.costWithItems} />
        <SummaryRow
          label="Profit"
          value={economy.profitWithItems}
          isBold
          color={economy.profitWithItems > 0 ? "success.main" : "error.main"}
        />
      </Stack>

      {showTokenStrategies && (
        <>
          <Divider sx={{ my: 2, borderStyle: "dashed" }} />

          <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
            <Image src={ITEM_IMAGES.gold_token} alt="gold token" width={18} height={18} />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: "0.75rem" }}
            >
              Buy With Tokens ({IMBUING_CONFIG.mechanics.gold_tokens_needed}x)
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <SummaryRow label="Token Cost" value={economy.costWithTokens} />
            <SummaryRow
              label="Profit"
              value={economy.profitWithTokens}
              isBold
              color={economy.profitWithTokens > 0 ? "success.main" : "error.main"}
            />
          </Stack>
        </>
      )}
    </Paper>
  );
}
