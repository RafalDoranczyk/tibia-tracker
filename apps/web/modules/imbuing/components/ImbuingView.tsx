"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { FloatingActionButton } from "@/components";
import { useToast } from "@/providers/app";

import { updateImbuingItemPrices } from "../actions/update-imbuing-item-prices.action";
import { baseScrolls, elementalScrolls, skillScrolls } from "../constants";
import { mapImbuingPricesToForm } from "../mappers/mapImbuingPricesToForm";
import {
  ImbuingFormSchema,
  type ImbuingFormValues,
  type ImbuingItem,
  type ImbuingScroll,
} from "../schemas";
import { GoldTokenInput } from "./GoldTokenInput";
import { ScrollCard } from "./ScrollCard";

type ScrollsSectionProps = {
  scrolls: ImbuingScroll[];
  title: string;
};

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
          <ScrollCard key={scroll.key} scroll={scroll} />
        ))}
      </Box>
    </div>
  );
}

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
    <FormProvider {...form}>
      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <GoldTokenInput />
        </Box>

        <ScrollsSection title="Basic Scrolls" scrolls={baseScrolls} />
        <ScrollsSection title="Elemental Scrolls" scrolls={elementalScrolls} />
        <ScrollsSection title="Skill Scrolls" scrolls={skillScrolls} />
        <SaveButton />
      </Stack>
    </FormProvider>
  );
}
