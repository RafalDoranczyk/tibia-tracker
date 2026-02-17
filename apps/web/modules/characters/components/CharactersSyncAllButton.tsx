"use client";

import SyncIcon from "@mui/icons-material/Sync";
import { Button, Tooltip } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/hooks";
import { syncAllCharacters } from "@/modules/characters/actions/sync-all-characters";
import { CHARACTER_CACHE_DURATION_MINUTES } from "../constants";

type CharactersSyncAllButtonProps = {
  lastSyncTimestamp: number;
  disabled: boolean;
};

export function CharactersSyncAllButton({
  lastSyncTimestamp,
  disabled,
}: CharactersSyncAllButtonProps) {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [secondsLeft, setSecondsLeft] = useState(0);

  const COOLDOWN_SEC = CHARACTER_CACHE_DURATION_MINUTES * 60;

  useEffect(() => {
    const calculate = () => {
      const lastSyncTime = new Date(lastSyncTimestamp).getTime();

      if (Number.isNaN(lastSyncTime) || lastSyncTime === 0) {
        setSecondsLeft(0);
        return;
      }

      const diff = Math.floor((Date.now() - lastSyncTime) / 1000);
      const remaining = COOLDOWN_SEC - diff;

      setSecondsLeft(remaining > 0 ? remaining : 0);
    };
    calculate();
  }, [lastSyncTimestamp, COOLDOWN_SEC]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleSync = () => {
    startTransition(async () => {
      try {
        await syncAllCharacters();
        setSecondsLeft(COOLDOWN_SEC);
        toast.success("All characters refreshed!");
      } catch {
        toast.error("Failed to sync characters");
      }
    });
  };

  return (
    <Tooltip
      placement="left"
      title={`Syncing will refresh all character data immediately fetching from Tibia website.`}
    >
      <Button
        onClick={handleSync}
        disabled={disabled || isPending || secondsLeft > 0}
        color="secondary"
        variant="outlined"
        startIcon={<SyncIcon className={isPending ? "animate-spin" : ""} />}
        sx={{
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
          "& .animate-spin": {
            animation: "spin 1s linear infinite",
          },
        }}
      >
        {isPending
          ? "Syncing..."
          : secondsLeft > 0
            ? `Sync available in ${secondsLeft}s`
            : "Sync all characters"}
      </Button>
    </Tooltip>
  );
}
