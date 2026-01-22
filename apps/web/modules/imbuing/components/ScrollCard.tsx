import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
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
import { useEffect, useState } from "react";

import { PRICE_DEBOUNCE_MS } from "../constants";
import { useScrollPricing } from "../hooks/useScrollPricing";
import { ITEM_IMAGES } from "../images";
import { useImbuingPriceStore } from "../imbuingPriceStore";
import type { ImbuingPriceKey, Scroll } from "../types";
import type { ScrollEconomyResult } from "../utils/calculateScrollEconomy";

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
            <Typography>Profit with items</Typography>
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
                <Typography>Profit with tokens</Typography>
                <Image src={ITEM_IMAGES.gold_token} alt="gold token" width={24} height={24} />
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

function ScrollPriceInput({ scrollKey }: { scrollKey: ImbuingPriceKey }) {
  const scrollPrice = useImbuingPriceStore((s) => s.prices[scrollKey]);
  const setScrollPrice = useImbuingPriceStore((s) => s.setPrice);

  const [localValue, setLocalValue] = useState(scrollPrice || 0);

  useEffect(() => {
    if (scrollPrice !== undefined) {
      setLocalValue(scrollPrice);
    }
  }, [scrollPrice]);

  useEffect(() => {
    const t = setTimeout(() => {
      setScrollPrice(scrollKey, localValue);
    }, PRICE_DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [localValue, setScrollPrice, scrollKey]);

  return (
    <TextField
      sx={{ maxWidth: 140 }}
      label="Scroll Price"
      value={localValue}
      onChange={(e) => setLocalValue(Number(e.target.value))}
    />
  );
}

function ItemPriceInput({ itemKey }: { itemKey: ImbuingPriceKey }) {
  const price = useImbuingPriceStore((s) => s.prices[itemKey] ?? 0);
  const setPrice = useImbuingPriceStore((s) => s.setPrice);

  return (
    <TextField
      size="small"
      type="number"
      value={price}
      onChange={(e) => setPrice(itemKey, Number(e.target.value))}
      sx={{ maxWidth: 120 }}
    />
  );
}

type ScrollCardProps = {
  scroll: Scroll;
};

export function ScrollCard({ scroll }: ScrollCardProps) {
  const { economy, hasAllPrices } = useScrollPricing(scroll);

  const { imageUrl, color, name, items } = scroll;

  return (
    <Card variant="outlined" sx={{ px: 2, py: 1 }}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        px={2}
        py={1}
        borderLeft={`6px solid ${color}`}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Image src={imageUrl || ""} alt={name} width={40} height={40} />

          <Typography variant="h6" fontWeight={800}>
            {name.toUpperCase()}
          </Typography>
        </Stack>

        <ScrollPriceInput scrollKey={scroll.key} />
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, xl: 7, xxl: 6 }}>
          <Paper variant="outlined">
            <TableContainer>
              <Table size="small">
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
                  {items.map(({ key, name, quantity, imageUrl }) => {
                    return (
                      <TableRow hover key={key}>
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
                          <ItemPriceInput itemKey={key} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, xl: 5, xxl: 6 }}>
          {hasAllPrices && economy ? (
            <ScrollSummary
              {...economy}
              showTokenStrategies={scroll.craftMethods.includes("tokens")}
            />
          ) : (
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography color="error" fontWeight={600}>
                Fill in item prices to see profitability
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Some required item prices are missing or set to 0.
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
