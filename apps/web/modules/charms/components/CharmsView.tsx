"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { ConfirmDialog } from "@/components";
import { useActiveCharacter } from "@/providers/feature/dashboard";

import { removeCharacterCharm } from "../actions/removeCharacterCharm";
import { unlockCharacterCharm } from "../actions/unlockCharacterCharm";
import type { CharmWithStatus } from "../schemas";
import { CharmCard } from "./CharmCard";
import { CharmUnlockModal } from "./CharmUnlockModal";

type CharmsViewProps = {
  charms: CharmWithStatus[];
};

export function CharmsView({ charms }: CharmsViewProps) {
  const { activeCharacterId } = useActiveCharacter();

  const [selectedCharmForUnlock, setSelectedCharmForUnlock] = useState<CharmWithStatus | null>(
    null
  );
  const [selectedCharmForRemoval, setSelectedCharmForRemoval] = useState<CharmWithStatus | null>(
    null
  );

  const openUnlockModal = (charm: CharmWithStatus) => setSelectedCharmForUnlock(charm);
  const closeUnlockModal = () => setSelectedCharmForUnlock(null);

  const openRemoveDialog = (charm: CharmWithStatus) => setSelectedCharmForRemoval(charm);
  const closeRemoveDialog = () => setSelectedCharmForRemoval(null);

  const handleUnlockConfirm = async (level: number) => {
    if (!activeCharacterId) return;
    if (!selectedCharmForUnlock) return;

    await unlockCharacterCharm({
      characterId: activeCharacterId,
      charmId: selectedCharmForUnlock.id,
      level,
    });

    closeUnlockModal();
  };

  const handleRemoveConfirm = async () => {
    if (!activeCharacterId) return;
    if (!selectedCharmForRemoval) return;

    await removeCharacterCharm({
      characterId: activeCharacterId,
      charmId: selectedCharmForRemoval.id,
    });

    closeRemoveDialog();
  };

  const majorCharms = charms.filter((c) => c.type === "Major");
  const minorCharms = charms.filter((c) => c.type === "Minor");

  const renderCharmSection = (title: string, items: CharmWithStatus[]) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {items.map((charm) => (
          <CharmCard
            key={charm.id}
            charm={charm}
            onUnlock={() => openUnlockModal(charm)}
            onRemove={() => openRemoveDialog(charm)}
          />
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box>
      {renderCharmSection("Major Charms", majorCharms)}
      {renderCharmSection("Minor Charms", minorCharms)}

      {selectedCharmForUnlock && (
        <CharmUnlockModal
          open
          onClose={closeUnlockModal}
          charm={selectedCharmForUnlock}
          onConfirm={handleUnlockConfirm}
        />
      )}

      <ConfirmDialog.Root
        open={!!selectedCharmForRemoval}
        onOpenChange={(open) => !open && closeRemoveDialog()}
      >
        <ConfirmDialog.Header
          title="Remove Charm"
          description="Are you sure you want to remove this charm? This cannot be undone."
        />
        <ConfirmDialog.Content>
          <Typography variant="body2">
            Removing this charm will reset all progress for it.
          </Typography>
        </ConfirmDialog.Content>
        <ConfirmDialog.Actions>
          <Button variant="outlined" onClick={closeRemoveDialog}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={handleRemoveConfirm}>
            Confirm
          </Button>
        </ConfirmDialog.Actions>
      </ConfirmDialog.Root>
    </Box>
  );
}
