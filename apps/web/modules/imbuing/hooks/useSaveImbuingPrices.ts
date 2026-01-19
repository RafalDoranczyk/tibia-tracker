import { useTransition } from "react";

import { updateImbuingItemPrices } from "../actions/updateImbuingItemPrices";
import { useImbuingPriceStore } from "../imbuingPriceStore";
import { getPriceChanges } from "../utils/getPriceChanges";

export function useSaveImbuingPrices() {
  const [isPending, startTransition] = useTransition();

  const hasChanges = useImbuingPriceStore((s) => s.hasChanges);
  const markSaved = useImbuingPriceStore((s) => s.markSaved);

  const save = async () => {
    const { prices, savedPrices } = useImbuingPriceStore.getState();
    const changes = getPriceChanges(prices, savedPrices);
    if (!Object.keys(changes).length) return;

    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          await updateImbuingItemPrices(changes);
          markSaved();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  };

  return { save, hasChanges, isPending };
}
