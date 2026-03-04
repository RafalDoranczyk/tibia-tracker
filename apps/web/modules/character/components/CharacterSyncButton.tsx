"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

interface CharacterSyncButtonProps {
  globalCharacterId: string;
  name: string;
  world: string;
  vocation: string;
  canSync: boolean;
}

export function CharacterSyncButton({
  globalCharacterId,
  name,
  world,
  vocation,
  canSync,
}: CharacterSyncButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(!canSync);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSync = async () => {
    setIsLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/sync-character-with-guildstats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ globalCharacterId, name, world, vocation }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsDone(true);
        setStatusMessage(result.skipped ? "Already up to date" : "Sync successful!");
      } else {
        setStatusMessage(`Error: ${result.error || "Unknown"}`);
      }
    } catch {
      setStatusMessage("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const tooltipText = isDone
    ? "Data is already up to date. Next update available tomorrow after 11:00 AM."
    : "Fetch the latest experience data from external services (available once a day after 11:00 AM).";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start" }}>
      <Tooltip title={tooltipText} arrow placement="top">
        <span>
          {" "}
          <Button
            variant="contained"
            color={isDone ? "success" : "primary"}
            onClick={handleSync}
            disabled={isLoading || isDone}
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
              boxShadow: isDone ? "none" : 2,
              "&.Mui-disabled": {
                backgroundColor: isDone ? "success.light" : "action.disabledBackground",
                color: isDone ? "white" : "action.disabled",
                opacity: isDone ? 0.7 : 1,
              },
            }}
          >
            {isLoading ? "Syncing..." : isDone ? "Up to date" : "Force Manual Sync"}
          </Button>
        </span>
      </Tooltip>

      {statusMessage && (
        <Typography
          variant="caption"
          color={statusMessage.includes("Error") ? "error" : "textSecondary"}
        >
          {statusMessage}
        </Typography>
      )}
    </Box>
  );
}
