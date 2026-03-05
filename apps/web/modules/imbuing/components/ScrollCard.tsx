import { Box, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { EmptyState } from "@/components";
import { useScrollEconomy } from "../hooks/useScrollEconomy";
import type { ImbuingScroll } from "../types";
import { canBuyScrollForTokens } from "../utils/canBuyScrollForTokens";
import { ScrollCardPriceInput } from "./ScrollCardPriceInput";
import { ScrollCardSummary } from "./ScrollCardSummary";
import { ScrollCardTable } from "./ScrollCardTable";

type ScrollCardProps = {
  scroll: ImbuingScroll;
};

export const ScrollCard = React.memo(function ScrollCard({ scroll }: ScrollCardProps) {
  const economy = useScrollEconomy(scroll);
  const showTokenStrategies = canBuyScrollForTokens(scroll.craftMethods);

  return (
    <Card
      variant="outlined"
      sx={{
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ flex: 1 }}>
          <Image
            src={scroll.imageUrl}
            alt={scroll.name}
            width={64}
            height={64}
            style={{ flexShrink: 0, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
          />
          <Typography variant="h6" sx={{ fontSize: "1rem", letterSpacing: 1 }}>
            {scroll.name.toUpperCase()}
          </Typography>
        </Stack>

        <ScrollCardPriceInput inputKey={scroll.key} inputVariant="scroll" />
      </Box>

      <Divider />

      <CardContent sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 7 }}>
            <ScrollCardTable items={scroll.items} />
          </Grid>

          <Grid size={{ xs: 12, xl: 5 }}>
            {economy ? (
              <ScrollCardSummary economy={economy} showTokenStrategies={showTokenStrategies} />
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
