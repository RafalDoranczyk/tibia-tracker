"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { FloatingActionButton } from "@/components";
import { useToast } from "@/providers/app";

import { updateImbuingItemPrices } from "../actions/update-imbuing-item-prices";
import { baseScrolls, elementalScrolls, skillScrolls } from "../constants";
import { mapImbuingPricesToForm } from "../mappers/mapImbuingPricesToForm";
import { ImbuingFormSchema, type ImbuingFormValues, type ImbuingItem } from "../schemas";
import { GoldTokenInput } from "./GoldTokenInput";
import { ScrollSection } from "./ScrollSection";

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

        <ScrollSection title="Basic Scrolls" scrolls={baseScrolls} />
        <ScrollSection title="Elemental Scrolls" scrolls={elementalScrolls} />
        <ScrollSection title="Skill Scrolls" scrolls={skillScrolls} />
        <SaveButton />
      </Stack>
    </FormProvider>
  );
}
