"use client";

import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

import { FloatingActionButton } from "@/components";
import { useUnsavedChangesGuard } from "@/hooks";
import { useToast } from "@/providers/global";

import { baseScrolls } from "../data/scrolls/base";
import { elementalScrolls } from "../data/scrolls/elemental";
import { skillScrolls } from "../data/scrolls/skill";
import { useSaveImbuingPrices } from "../hooks/useSaveImbuingPrices";
import { useImbuingPriceStore } from "../imbuingPriceStore";
import type { ImbuingItem, Scroll } from "../types";
import { ImbuingHeader } from "./ImbuingHeader";
import { ImbuingScrollCard } from "./ImbuingScrollCard";
import { ImbuingViewSkeleton } from "./ImbuingViewSkeleton";

type ScrollsSectionProps = {
  scrolls: Scroll[];
  title: string;
};

function FloatingSaveImbuingButton() {
  const toast = useToast();
  const { save, hasChanges, isPending } = useSaveImbuingPrices();

  const onClick = async () => {
    try {
      await save();
      toast.success("Prices saved");
    } catch {
      toast.error("Failed to save prices");
    }
  };

  return (
    <FloatingActionButton visible={hasChanges} onClick={onClick} loading={isPending}>
      Save changes
    </FloatingActionButton>
  );
}

function ScrollsSection({ scrolls, title }: ScrollsSectionProps) {
  return (
    <div>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2} px={1}>
        <Typography variant="h5" fontWeight={800}>
          {title}
        </Typography>

        <Divider sx={{ flexGrow: 1 }} />
      </Stack>

      {/* Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          xl: "repeat(2, 1fr)",
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
  const hasChanges = useImbuingPriceStore((s) => s.hasChanges);

  useUnsavedChangesGuard(hasChanges);

  useEffect(() => {
    if (!imbuingItemPrices) return;
    initialize(imbuingItemPrices);
  }, [imbuingItemPrices, initialize]);

  if (!isInitialized) {
    return <ImbuingViewSkeleton />;
  }

  return (
    <Stack spacing={3}>
      <ImbuingHeader />

      <ScrollsSection title="Basic Scrolls" scrolls={baseScrolls} />
      <ScrollsSection title="Elemental Scrolls" scrolls={elementalScrolls} />
      <ScrollsSection title="Skill Scrolls" scrolls={skillScrolls} />

      <FloatingSaveImbuingButton />
    </Stack>
  );
}
