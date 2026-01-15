import { ShoppingBasket } from "@mui/icons-material";
import {
  Box,
  Card,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { useScrollPricing } from "../hooks/useScrollPricing";
import { ITEM_IMAGES } from "../images";
import type { Scroll } from "../types";
import { getScrollColorStyles, type ScrollEconomyResult } from "../utils";
import { ScrollCardSkeleton } from "./ScrollCardSkeleton";

function SummaryRow({
  children,
  label,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>{label}</Typography>
      {children}
    </Box>
  );
}

type ScrollSummaryProps = ScrollEconomyResult & {
  showTokenStrategies: boolean;
};

function ScrollSummary({
  costWithItems,
  costWithTokens,
  profitWithItems,
  profitWithTokens,
  tokenFlipProfit,
  showTokenStrategies,
}: ScrollSummaryProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, width: "100%" }}>
      <Typography fontWeight={700} mb={2}>
        Summary
      </Typography>

      <Stack spacing={1.5}>
        <SummaryRow label="Cost with items">
          <Typography>{costWithItems.toLocaleString()}</Typography>
        </SummaryRow>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Stack gap={1} direction="row" alignItems="center">
            <Typography>Profit</Typography>
            <ShoppingBasket fontSize="small" />
          </Stack>

          <Typography fontWeight={700} color={profitWithItems > 0 ? "success.main" : "error.main"}>
            {profitWithItems.toLocaleString()}
          </Typography>
        </Box>

        {showTokenStrategies && (
          <>
            <Divider />

            <SummaryRow label="Cost with tokens">
              <Typography>{costWithTokens.toLocaleString()}</Typography>
            </SummaryRow>

            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Stack gap={1} direction="row" alignItems="center">
                <Typography>Profit</Typography>
                <Image src={ITEM_IMAGES["Gold Token"]} alt="gold token" width={24} height={24} />
              </Stack>

              <Typography
                fontWeight={600}
                color={profitWithTokens > 0 ? "success.main" : "error.main"}
              >
                {profitWithTokens.toLocaleString()}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Stack gap={1} direction="row" alignItems="center">
                <Typography>Token → Items</Typography>
                <ShoppingBasket fontSize="small" />
              </Stack>

              <Typography
                fontWeight={700}
                color={tokenFlipProfit > 0 ? "success.main" : "error.main"}
              >
                {tokenFlipProfit.toLocaleString()}
              </Typography>
            </Box>
          </>
        )}
      </Stack>
    </Paper>
  );
}

type ScrollTableWithSummaryProps = {
  scroll: Scroll;
  tokenPrice: number;
};

export function ScrollCard({ scroll, tokenPrice }: ScrollTableWithSummaryProps) {
  const { scrollPrice, prices, setScrollPrice, setItemPrice, economy, canCraftWithTokens, ready } =
    useScrollPricing(scroll, tokenPrice);

  const typedPrices = prices as Record<number, number>;

  if (!ready) {
    return <ScrollCardSkeleton />;
  }

  const { imageUrl, color, name, items } = scroll;

  return (
    <Card
      variant="outlined"
      sx={{
        px: 2,
        py: 1,
      }}
    >
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        px={2}
        sx={{ ...getScrollColorStyles(color) }}
        py={1}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Image src={imageUrl || ""} alt={name} width={40} height={40} style={{ flexShrink: 0 }} />

          <Typography variant="h6" fontWeight={800}>
            {name.toUpperCase()}
          </Typography>
        </Stack>

        <Stack gap={2} flexDirection="row" justifyContent="space-between" alignItems="center">
          <TextField
            type="number"
            value={scrollPrice}
            onChange={(e) => setScrollPrice(Number(e.target.value))}
            sx={{ maxWidth: 140 }}
          />
        </Stack>
      </Stack>

      <Grid container spacing={2} alignItems="stretch">
        <Grid size={{ xs: 7, xxl: 7 }} display="flex">
          <Paper sx={{ flex: 1 }} variant="outlined">
            <TableContainer sx={{ height: "100%" }}>
              <Table size="small" sx={{ height: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Qty
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {items.map(({ id, name, quantity, imageUrl }) => {
                    const price = typedPrices[id] ?? 0;

                    return (
                      <TableRow hover key={id}>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Image
                              src={imageUrl}
                              alt={name}
                              width={36}
                              height={36}
                              style={{ flexShrink: 0 }}
                            />

                            <Typography variant="body2">{name}</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="right">{quantity}</TableCell>
                        <TableCell align="right">
                          <TextField
                            size="small"
                            type="number"
                            value={price}
                            onChange={(e) => setItemPrice(id, Number(e.target.value))}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 5, xxl: 5 }} display="flex">
          <ScrollSummary {...economy} showTokenStrategies={canCraftWithTokens} />
        </Grid>
      </Grid>
    </Card>
  );
}
