"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { FloatingActionButton } from "@/components";
import { useToast } from "@/providers/app";

import { updateImbuingItemPrices } from "../actions/updateImbuingItemPrices";
import { baseScrolls, elementalScrolls, skillScrolls } from "../data";
import { mapImbuingPricesToForm } from "../mappers/mapImbuingPricesToForm";
import {
  ImbuingFormSchema,
  type ImbuingFormValues,
  type ImbuingItem,
} from "../schemas/imbuing.schema";
import type { Scroll } from "../types";
import { GoldTokenInput } from "./GoldTokenInput";
import { ScrollCard } from "./ScrollCard";

type ScrollsSectionProps = {
  scrolls: Scroll[];
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

function SaveButton({ onClick }: { onClick: () => void }) {
  const { formState } = useFormContext();
  const { isDirty, isSubmitting } = formState;

  return (
    <FloatingActionButton onClick={onClick} visible={isDirty} loading={isSubmitting}>
      Save changes
    </FloatingActionButton>
  );
}

type ImbuingViewProps = {
  imbuingItemPrices: ImbuingItem[];
};

export function ImbuingView({ imbuingItemPrices }: ImbuingViewProps) {
  const toast = useToast();

  const defaultValues = mapImbuingPricesToForm(imbuingItemPrices);

  const form = useForm<ImbuingFormValues>({
    defaultValues,
    resolver: zodResolver(ImbuingFormSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset } = form;

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
    <FormProvider {...form}>
      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <GoldTokenInput />
        </Box>

        <ScrollsSection title="Basic Scrolls" scrolls={baseScrolls} />
        <ScrollsSection title="Elemental Scrolls" scrolls={elementalScrolls} />
        <ScrollsSection title="Skill Scrolls" scrolls={skillScrolls} />
        <SaveButton onClick={onSubmit} />
      </Stack>
    </FormProvider>
  );
}
