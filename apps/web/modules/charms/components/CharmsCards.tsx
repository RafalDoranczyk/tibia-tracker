"use client";

import { Container, Divider, Grid, Typography } from "@mui/material";
import { useMemo, useState, useTransition } from "react";

import { useRequiredCharacterId } from "@/modules/characters";
import { useToast } from "@/providers/app";

import { setCharacterCharmLevel } from "../actions/setCharacterCharmLevel";
import type { CharacterCharmWithProgress, CharmLevel } from "../schemas";
import { MajorCard } from "./MajorCard";
import { MinorCard } from "./MinorCard";
import { SetLevelModal } from "./SetLevelModal";

type CharmsCardsProps = {
  charms: CharacterCharmWithProgress[];
  availableMajorPoints: number;
  availableMinorPoints: number;
};

export function CharmsCards({
  charms,
  availableMajorPoints,
  availableMinorPoints,
}: CharmsCardsProps) {
  const characterId = useRequiredCharacterId();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const [selectedCharm, setSelectedCharm] = useState<CharacterCharmWithProgress | null>(null);

  const closeModal = () => setSelectedCharm(null);

  // Single handler for unlock + upgrade
  const handleSetCharmLevel = (level: CharmLevel) => {
    if (!selectedCharm) return;

    startTransition(async () => {
      try {
        await setCharacterCharmLevel({
          character_id: characterId,
          charm_id: selectedCharm.id,
          level,
        });

        toast.success(`${selectedCharm.name} updated to level ${level}.`);
        closeModal();
      } catch {
        toast.error(`Failed to update ${selectedCharm.name}.`);
      }
    });
  };

  // Split charms once, memoized
  const { majorCharms, minorCharms } = useMemo(() => {
    const major: CharacterCharmWithProgress[] = [];
    const minor: CharacterCharmWithProgress[] = [];

    for (const c of charms) {
      (c.type === "major" ? major : minor).push(c);
    }

    return { majorCharms: major, minorCharms: minor };
  }, [charms]);

  const availablePoints = selectedCharm
    ? selectedCharm.type === "major"
      ? availableMajorPoints
      : availableMinorPoints
    : 0;

  return (
    <Container maxWidth="xxl">
      <Grid container spacing={6}>
        <Grid size={{ xl: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Major Charms
          </Typography>
          <Divider sx={{ mt: 2, mb: 4, bgcolor: "red" }} />

          <Grid container spacing={2}>
            {majorCharms.map((charm) => (
              <Grid key={charm.id} size={{ xs: 12, sm: 6, md: 4, xxl: 3 }} height={300}>
                <MajorCard
                  charm={charm}
                  availableMajorPoints={availableMajorPoints}
                  onSelect={() => setSelectedCharm(charm)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={{ xl: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Minor Charms
          </Typography>
          <Divider sx={{ mt: 2, mb: 4 }} />

          <Grid container spacing={2}>
            {minorCharms.map((charm) => (
              <Grid key={charm.id} size={{ xs: 12, sm: 6, md: 4, xxl: 3 }} height={300}>
                <MinorCard
                  charm={charm}
                  availableMinorPoints={availableMinorPoints}
                  onSelect={() => setSelectedCharm(charm)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {selectedCharm && (
        <SetLevelModal
          charm={selectedCharm}
          availablePoints={availablePoints}
          isPending={isPending}
          onClose={closeModal}
          onConfirm={handleSetCharmLevel}
        />
      )}
    </Container>
  );
}
