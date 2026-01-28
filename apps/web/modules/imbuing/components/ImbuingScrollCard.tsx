import { Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import { EmptyState } from "@/components";

import { useScrollEconomy } from "../hooks/useScrollEconomy";
import type { Scroll } from "../types";
import { canBuyScrollForTokens } from "../utils/canBuyScrollForTokens";
import { ImbuingScrollCardItems } from "./ImbuingScrollCardItems";
import { ImbuingScrollCardPriceInput } from "./ImbuingScrollCardPriceInput";
import { ImbuingScrollCardSummary } from "./ImbuingScrollCardSummary";

type ImbuingScrollCardProps = {
  scroll: Scroll;
};

export const ImbuingScrollCard = React.memo(function ImbuingScrollCard({
  scroll,
}: ImbuingScrollCardProps) {
  const economy = useScrollEconomy(scroll);
  const showTokenStrategies = canBuyScrollForTokens(scroll.craftMethods);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          borderLeft={`3px solid ${scroll.color}`}
          px={1}
        >
          {/* LEFT */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Image
              src={scroll.imageUrl}
              alt={scroll.name}
              width={36}
              height={36}
              style={{ flexShrink: 0 }}
            />
            <Typography variant="h6" fontWeight={700}>
              {scroll.name.toUpperCase()}
            </Typography>
          </Stack>

          {/* RIGHT */}
          <ImbuingScrollCardPriceInput
            label="Selling for"
            inputKey={scroll.key}
            sx={{ width: 110 }}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2} alignItems="stretch">
          <Grid size={{ xs: 12, xl: 7 }}>
            <ImbuingScrollCardItems items={scroll.items} />
          </Grid>

          <Grid size={{ xs: 12, xl: 5 }}>
            {economy ? (
              <ImbuingScrollCardSummary
                economy={economy}
                showTokenStrategies={showTokenStrategies}
              />
            ) : (
              <EmptyState
                size="small"
                variant="economy"
                title="No economy data available."
                subtitle="Fill in the prices to see the economy summary."
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});
