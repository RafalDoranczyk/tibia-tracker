"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { syncCharacterExpHistory } from "../actions/sync-character-exp-history";
import type { SetupNewGlobalCharacterProps } from "../server/setup-new-global-character";

type CharacterSyncButtonProps = SetupNewGlobalCharacterProps["character"] & {
  isSyncAllowed: boolean;
};

export function CharacterSyncButton({
  globalCharacterId,
  name,
  world,
  vocation,
  isSyncAllowed,
}: CharacterSyncButtonProps) {
  const isSyncAttempted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(!isSyncAllowed);

  const handleSync = useCallback(async () => {
    if (!isSyncAllowed) return;

    setIsLoading(true);

    try {
      await syncCharacterExpHistory({
        globalCharacterId,
        name,
        world,
        vocation,
      });

      setIsDone(true);
    } catch {
      console.log("err");
    } finally {
      setIsLoading(false);
    }
  }, [globalCharacterId, name, world, vocation, isSyncAllowed]);

  useEffect(() => {
    if (isSyncAllowed && !isSyncAttempted.current) {
      isSyncAttempted.current = true;
      handleSync();
    }
  }, [isSyncAllowed, handleSync]);

  const tooltipText = isDone
    ? "Data is already up to date. Next update available tomorrow after 11:00 AM."
    : "Fetch the latest experience data from external services.";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start" }}>
      <Tooltip title={tooltipText} arrow placement="top">
        <span>
          <Button
            variant="contained"
            color={isDone ? "success" : "primary"}
            onClick={handleSync}
            disabled={isLoading || isDone || !isSyncAllowed}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : isDone ? (
                <CheckCircleOutlineIcon />
              ) : (
                <SyncIcon />
              )
            }
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              "&.Mui-disabled": {
                backgroundColor: isDone ? "success.light" : "action.disabledBackground",
                color: isDone ? "white" : "action.disabled",
              },
            }}
          >
            {isLoading ? "Syncing..." : isDone ? "Up to date" : "Force Manual Sync"}
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
