"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import type { ImbuingItem } from "@repo/database/imbuing-prices";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FloatingActionButton } from "@/components";
import { useToast } from "@/hooks";
import { updateImbuingItemPrices } from "../actions/update-imbuing-item-prices";
import { baseScrolls, elementalScrolls, skillScrolls } from "../constants";
import { mapImbuingPricesToForm } from "../mappers/mapImbuingPricesToForm";
import { ImbuingFormSchema, type ImbuingFormValues } from "../schemas";
import type { ImbuingScroll } from "../types";
import { GoldTokenInput } from "./GoldTokenInput";
import { ScrollCard } from "./ScrollCard";

function SaveButton() {
  const toast = useToast();
  const { formState, handleSubmit, reset } = useFormContext();
  const { isDirty, isSubmitting } = formState;

  const onSubmit = handleSubmit(async (values) => {
    try {
      await updateImbuingItemPrices(values);

      reset(values);
      toast.success("Prices saved");
    } catch {
      toast.error("Failed to save prices");
    }
  });

  return (
    <FloatingActionButton onClick={onSubmit} visible={isDirty} loading={isSubmitting}>
      Save changes
    </FloatingActionButton>
  );
}

type ScrollSectionProps = {
  scrolls: ImbuingScroll[];
  title: string;
};

function ScrollSection({ scrolls, title }: ScrollSectionProps) {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={2} px={1}>
        <Box
          sx={{
            width: 4,
            height: 24,
            bgcolor: "secondary.main",
            borderRadius: 1,
            boxShadow: (theme) => `0 0 8px ${theme.palette.secondary.main}80`,
          }}
        />

        <Typography
          variant="h6"
          fontWeight={800}
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.05rem",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

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
          <ScrollCard key={scroll.key} scroll={scroll} />
        ))}
      </Box>
    </div>
  );
}

type ImbuingViewProps = {
  imbuingItemPrices: ImbuingItem[];
};

export function ImbuingView({ imbuingItemPrices }: ImbuingViewProps) {
  const defaultValues = mapImbuingPricesToForm(imbuingItemPrices);

  const form = useForm<ImbuingFormValues>({
    defaultValues,
    resolver: zodResolver(ImbuingFormSchema),
    mode: "onBlur",
  });

  return (
    <Container maxWidth="xxl">
      <FormProvider {...form}>
        <Box display="flex" justifyContent="flex-end">
          <GoldTokenInput />
        </Box>

        <Stack spacing={4}>
          <ScrollSection title="Basic Scrolls" scrolls={baseScrolls} />
          <ScrollSection title="Elemental Scrolls" scrolls={elementalScrolls} />
          <ScrollSection title="Skill Scrolls" scrolls={skillScrolls} />
        </Stack>
        <SaveButton />
      </FormProvider>
    </Container>
  );
}
