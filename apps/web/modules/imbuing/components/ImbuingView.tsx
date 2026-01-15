"use client";

import { Box, Stack, Typography } from "@mui/material";

import { DebouncedTextField } from "@/components";
import { useLocalStorageState } from "@/hooks";

import { baseScrolls } from "../data/baseScrolls";
import { elementScrolls } from "../data/elementalScrolls";
import { skillScrolls } from "../data/skillScrolls";
import type { Scroll } from "../types";
import { ScrollCard } from "./ScrollCard";

type ScrollsSectionProps = {
  scrolls: Scroll[];
  tokenPrice: number;
  title: string;
};

const TOKEN_PRICE_STORAGE_KEY = "imbuing:tokenPrice";

function ScrollsSection({ scrolls, tokenPrice, title }: ScrollsSectionProps) {
  return (
    <>
      <Box
        sx={{
          px: 2,
          py: 1,
          borderLeft: "4px solid",
          borderColor: "primary.main",
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
      </Box>

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
          <ScrollCard key={scroll.name} tokenPrice={tokenPrice} scroll={scroll} />
        ))}
      </Box>
    </>
  );
}

export function ImbuingView() {
  const [tokenPrice, setTokenPrice] = useLocalStorageState<number>(TOKEN_PRICE_STORAGE_KEY, 52000);

  return (
    <Stack spacing={3}>
      <DebouncedTextField
        label="Gold Token Price"
        value={tokenPrice}
        onChange={setTokenPrice}
        debounceMs={400}
      />

      <ScrollsSection title="Basic Scrolls" scrolls={baseScrolls} tokenPrice={tokenPrice} />
      <ScrollsSection title="Elemental Scrolls" scrolls={elementScrolls} tokenPrice={tokenPrice} />
      <ScrollsSection title="Skill Scrolls" scrolls={skillScrolls} tokenPrice={tokenPrice} />
    </Stack>
  );
}
