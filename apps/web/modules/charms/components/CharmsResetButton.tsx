"use client";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Button, Tooltip } from "@mui/material";
import { useState, useTransition } from "react";

import { ConfirmDialog } from "@/components";
import { useToast } from "@/hooks";

import { resetCharacterCharms } from "../actions/reset-character-charms";

type CharmsResetButtonProps = {
  characterId: string;
  majorSpent: number;
};

export function CharmsResetButton({ characterId, majorSpent }: CharmsResetButtonProps) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(async () => {
      try {
        await resetCharacterCharms(characterId);
        setOpen(false);
        toast.success("All charms have been reset.");
      } catch {
        toast.error("Failed to reset charms.");
      }
    });
  };
  return (
    <>
      <Tooltip
        title={
          majorSpent > 0
            ? "Reset all charms and reclaim spent charm points. This cannot be undone."
            : "You haven't spent any charm points yet." // Lepiej dać info dlaczego disabled
        }
        placement="left"
      >
        <Box component="span">
          <Button
            disabled={majorSpent === 0}
            loading={isPending}
            color="error"
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={() => setOpen(true)}
          >
            Reset All Charms
          </Button>
        </Box>
      </Tooltip>

      <ConfirmDialog.Root open={open} onOpenChange={setOpen}>
        <ConfirmDialog.Header
          title="Reset all charms?"
          description="This will remove ALL unlocked charms. This cannot be undone."
        />

        <ConfirmDialog.Actions>
          <ConfirmDialog.Cancel />
          <ConfirmDialog.Confirm color="error" loading={isPending} onClick={handleReset}>
            Reset Everything
          </ConfirmDialog.Confirm>
        </ConfirmDialog.Actions>
      </ConfirmDialog.Root>
    </>
  );
}
