"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SyncIcon from "@mui/icons-material/Sync";
import { Chip, keyframes, Tooltip } from "@mui/material";
import type { CharacterVocation } from "@repo/database/global-characters";
import { useCallback, useEffect, useRef, useState } from "react";
import { syncCharacterExpHistory } from "../actions/sync-character-exp-history";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const config = {
  syncing: {
    label: "Syncing history...",
    color: "info" as const,
    icon: <SyncIcon sx={{ animation: `${spin} 2s linear infinite` }} />,
    tooltip: "We are currently fetching your latest experience data.",
  },
  done: {
    label: "Up to date",
    color: "success" as const,
    icon: <CheckCircleIcon />,
    tooltip: "History is synchronized. Next update tomorrow after 11:00 AM.",
  },
  error: {
    label: "Sync failed",
    color: "error" as const,
    icon: <ErrorOutlineIcon />,
    tooltip: "There was a problem fetching data. We will try again later.",
  },
  idle: { label: "", color: "default" as const, icon: null, tooltip: "" },
};

type CharacterSyncStatusProps = {
  globalCharacterId: string;
  name: string;
  world: string;
  vocation: CharacterVocation;
  isSyncAllowed: boolean;
};

export function CharacterSyncStatus({
  globalCharacterId,
  name,
  world,
  vocation,
  isSyncAllowed,
}: CharacterSyncStatusProps) {
  const isSyncAttempted = useRef(false);
  const [status, setStatus] = useState<"syncing" | "done" | "error">("done");

  const handleSync = useCallback(async () => {
    if (!isSyncAllowed) {
      setStatus("done");
      return;
    }

    setStatus("syncing");
    try {
      await syncCharacterExpHistory({ globalCharacterId, name, world, vocation });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }, [globalCharacterId, name, world, vocation, isSyncAllowed]);

  useEffect(() => {
    if (isSyncAllowed && !isSyncAttempted.current) {
      isSyncAttempted.current = true;
      handleSync();
    }
  }, [isSyncAllowed, handleSync]);

  const current = config[status];

  return (
    <Tooltip title={current.tooltip} arrow placement="bottom">
      <Chip
        icon={current.icon}
        label={current.label}
        color={current.color}
        variant="outlined"
        size="small"
        sx={{
          height: 24,
          fontSize: "0.75rem",
          fontWeight: 600,
          border: "none",
          backgroundColor: "transparent",
          "& .MuiChip-icon": { fontSize: 18 },
        }}
      />
    </Tooltip>
  );
}
