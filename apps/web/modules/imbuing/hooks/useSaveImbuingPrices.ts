import { useTransition } from "react";

import { useToast } from "@/providers/global";

import { updateImbuingItemPrices } from "../actions/updateImbuingItemPrices";
import { useImbuingPriceStore } from "../imbuingPriceStore";
import { getPriceChanges } from "../utils/getPriceChanges";

export function useSaveImbuingPrices() {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const markSaved = useImbuingPriceStore((s) => s.markSaved);

  const onSave = async () => {
    const { prices, savedPrices } = useImbuingPriceStore.getState();
    const changes = getPriceChanges(prices, savedPrices);
    if (!Object.keys(changes).length) return;

    startTransition(async () => {
      try {
        await updateImbuingItemPrices(changes);
        markSaved();
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
