"use client";

import SyncIcon from "@mui/icons-material/Sync";
import { Button, Tooltip } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/hooks";
import { syncAllHistory } from "@/modules/characters/actions/sync-exp-history";

export function CharacterHistorySyncAllButton({
  lastSyncTimestamp,
  disabled,
}: {
  lastSyncTimestamp: number;
  disabled: boolean;
}) {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [secondsLeft, setSecondsLeft] = useState(0);

  const COOLDOWN_SEC = 30 * 60;

  useEffect(() => {
    const calculate = () => {
      const diff = Math.floor((Date.now() - lastSyncTimestamp) / 1000);
      const remaining = COOLDOWN_SEC - diff;
      setSecondsLeft(remaining > 0 ? remaining : 0);
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [lastSyncTimestamp]);

  const handleSync = () => {
    startTransition(async () => {
      try {
        const res = await syncAllHistory();
        toast.success(`History sync complete! Added ${res.totalNewEntries} new records.`);
      } catch {
        toast.error("Failed to sync history from GuildStats.");
      }
    });
  };

  return (
    <Tooltip title="Refresh experience charts and history for all characters.">
      <Button
        onClick={handleSync}
        disabled={disabled || isPending || secondsLeft > 0}
        color="info" // Używamy koloru info (niebieski) dla odróżnienia od głównego sync
        variant="outlined"
        startIcon={<SyncIcon className={isPending ? "animate-spin" : ""} />}
        sx={{
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
          "& .animate-spin": { animation: "spin 1s linear infinite" },
        }}
      >
        {isPending
          ? "Syncing History..."
          : secondsLeft > 0
            ? `History (${Math.ceil(secondsLeft / 60)}m)`
            : "Sync History"}
      </Button>
    </Tooltip>
  );
}
