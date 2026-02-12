import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { IMBUING_CONFIG } from "../constants";
import { ITEM_IMAGES } from "../images";
import type { ScrollEconomyResult } from "../utils/calculateScrollEconomy";

function SummaryRow({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography fontWeight={600} color={color}>
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
  return (
    <Paper sx={{ p: 2, width: "100%", height: "100%" }} variant="outlined">
      {/* ITEMS */}
      <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
        <Typography variant="subtitle2" fontWeight={700}>
          Using items
        </Typography>
        <ShoppingBasket fontSize="inherit" />
      </Stack>

      <Stack spacing={0.75}>
        <SummaryRow label="Cost" value={economy.costWithItems} />
        <SummaryRow
          label="Profit"
          value={economy.profitWithItems}
          color={economy.profitWithItems > 0 ? "success.main" : "error.main"}
        />
      </Stack>

      <Divider sx={{ my: 1 }} />

      {showTokenStrategies && (
        <>
          <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
            <Typography variant="subtitle2" fontWeight={700}>
              Using tokens ({IMBUING_CONFIG.mechanics.gold_tokens_needed}x)
            </Typography>
            <Image src={ITEM_IMAGES.gold_token} alt="gold token" width={16} height={16} />
          </Stack>

          <Stack spacing={0.75}>
            <SummaryRow label="Cost" value={economy.costWithTokens} />
            <SummaryRow
              label="Profit"
              value={economy.profitWithTokens}
              color={economy.profitWithTokens > 0 ? "success.main" : "error.main"}
            />
            <SummaryRow
              label="Tokens → Items"
              value={economy.tokenFlipProfit}
              color={economy.tokenFlipProfit > 0 ? "success.main" : "error.main"}
            />
          </Stack>
        </>
      )}
    </Paper>
  );
}
