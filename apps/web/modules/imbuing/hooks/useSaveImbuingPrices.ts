import { useTransition } from "react";

import { useToast } from "@/providers/global";

import { updateImbuingItemPrices } from "../actions/updateImbuingItemPrices";
import type { ImbuingFormValues } from "../schemas";

export function useSaveImbuingPrices() {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const onSave = async (values: ImbuingFormValues) => {
    startTransition(async () => {
      try {
        await updateImbuingItemPrices(values);
        toast.success("Prices saved");
      } catch {
        toast.error("Failed to save prices");
      }
    });
  };

  return {
    onSave,
    isPending,
  };
}
