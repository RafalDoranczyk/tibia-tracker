import { useFormContext, useWatch } from "react-hook-form";

import { formatNumberCompact } from "@/utils/formatting/formatNumberCompact";

import type { HuntSessionFormValues } from "../types";

export function useHuntStats() {
  const { control } = useFormContext<HuntSessionFormValues>();

  const duration_seconds = useWatch({ control, name: "duration_seconds" });
  const raw_xp_gain = useWatch({ control, name: "raw_xp_gain" });
  const xp_gain = useWatch({ control, name: "xp_gain" });
  const profit = useWatch({ control, name: "profit" });

  const calc = (v = 0) =>
    duration_seconds ? formatNumberCompact(Math.floor((v / duration_seconds) * 3600)) : "0";

  return {
    rawExpPerHour: calc(raw_xp_gain),
    expPerHour: calc(xp_gain),
    profitPerHour: calc(profit),
    formattedBalance: formatNumberCompact(profit ?? 0),
  };
}
