"use client";

import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

import { FloatingActionButton } from "@/components";

import { baseScrolls } from "../data/scrolls/base";
import { elementalScrolls } from "../data/scrolls/elemental";
import { skillScrolls } from "../data/scrolls/skill";
import { useSaveImbuingPrices } from "../hooks/useSaveImbuingPrices";
import { useImbuingPriceStore } from "../imbuingPriceStore";
import type { ImbuingItem, Scroll } from "../types";
import { ImbuingScrollCard } from "./ImbuingScrollCard";
import { ImbuingScrollCardPriceInput } from "./ImbuingScrollCardPriceInput";
import { ImbuingViewSkeleton } from "./ImbuingViewSkeleton";

type ScrollsSectionProps = {
  scrolls: Scroll[];
  title: string;
};

function FloatingSaveImbuingButton() {
  const hasChanges = useImbuingPriceStore((s) => s.hasChanges);
  const { onSave, isPending } = useSaveImbuingPrices();

  return (
    <FloatingActionButton visible={hasChanges} onClick={onSave} loading={isPending}>
      Save changes
    </FloatingActionButton>
  );
}

function ScrollsSection({ scrolls, title }: ScrollsSectionProps) {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={2} mb={2} px={1}>
        <Typography variant="h5" fontWeight={800}>
          {title}
        </Typography>

        <Divider sx={{ flexGrow: 1 }} />
      </Stack>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          lg: "repeat(2, 1fr)",
          xxl: "repeat(3, 1fr)",
        }}
        gap={2}
      >
        {scrolls.map((scroll) => (
          <ImbuingScrollCard key={scroll.name} scroll={scroll} />
        ))}
      </Box>
    </div>
  );
}

type ImbuingViewProps = {
  imbuingItemPrices: ImbuingItem[];
};

export function ImbuingView({ imbuingItemPrices }: ImbuingViewProps) {
  const initialize = useImbuingPriceStore((s) => s.initialize);
  const isInitialized = useImbuingPriceStore((s) => s.isInitialized);

  useEffect(() => {
    initialize(imbuingItemPrices);
  }, [imbuingItemPrices, initialize]);

  if (!isInitialized) {
    return <ImbuingViewSkeleton />;
  }

  console.log(imbuingItemPrices);

  console.log("render");

  return (
    <Stack spacing={3}>
      <Stack>
        <ImbuingScrollCardPriceInput
          label="Gold Token Price"
          inputKey="gold_token"
          sx={{ width: 120, ml: "auto" }}
        />
      </Stack>
      <ScrollsSection title="Basic Scrolls" scrolls={baseScrolls} />
      <ScrollsSection title="Elemental Scrolls" scrolls={elementalScrolls} />
      <ScrollsSection title="Skill Scrolls" scrolls={skillScrolls} />
      <FloatingSaveImbuingButton />
    </Stack>
  );
}
