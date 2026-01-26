import { Card, CardContent, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { useScrollPricing } from "../hooks/useScrollPricing";
import type { Scroll } from "../types";
import { ImbuingScrollCardItems } from "./ImbuingScrollCardItems";
import { ImbuingScrollCardPriceInput } from "./ImbuingScrollCardPriceInput";
import { ImbuingScrollCardSummary } from "./ImbuingScrollCardSummary";

type ImbuingScrollCardProps = {
  scroll: Scroll;
};

export function ImbuingScrollCard({ scroll }: ImbuingScrollCardProps) {
  const { economy, hasAllPrices } = useScrollPricing(scroll);

  const { imageUrl, color, name, items } = scroll;
  const showSummary = economy && hasAllPrices;

  return (
    <Card variant="outlined">
      <CardContent>
        {/* HEADER */}
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderLeft={`3px solid ${color}`}
        >
          <Stack ml={1} direction="row" alignItems="center" spacing={1}>
            <Image src={imageUrl} alt={name} width={36} height={36} />
            <Typography variant="h6">{name.toUpperCase()}</Typography>
          </Stack>

          <ImbuingScrollCardPriceInput
            label="Selling for"
            inputKey={scroll.key}
            sx={{ width: 110 }}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* CONTENT */}
        <Grid container spacing={2} alignItems="stretch">
          <Grid size={{ xs: 12, xl: 7, xxl: 7 }} sx={{ display: "flex" }}>
            <ImbuingScrollCardItems items={items} />
          </Grid>

          <Grid size={{ xs: 12, xl: 5, xxl: 5 }} sx={{ display: "flex", alignItems: "center" }}>
            {showSummary ? (
              <ImbuingScrollCardSummary
                economy={economy}
                showTokenStrategies={scroll.craftMethods.includes("tokens")}
              />
            ) : (
              <Paper variant="outlined" sx={{ p: 2, alignSelf: "flex-start" }}>
                <Typography color="error">Fill in item prices to see profitability</Typography>
                <Typography variant="body2" color="text.secondary">
                  Some required item prices are missing or set to 0.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
