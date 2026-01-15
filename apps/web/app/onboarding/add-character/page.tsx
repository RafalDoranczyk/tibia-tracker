"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { PATHS } from "@/constants";
import { CharacterModal } from "@/modules/characters";
import { useRequiredCharacterId } from "@/providers/feature/dashboard";

export default function AddCharacterPage() {
  const router = useRouter();

  const activeCharacterId = useRequiredCharacterId();

  const path = PATHS.CHARACTER(activeCharacterId).CHARMS;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      minHeight="80vh"
    >
      <Typography variant="h5" mb={2}>
        Welcome to Tibia Tracker!
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Add your first character to get started.
      </Typography>

      <CharacterModal
        open
        onClose={() => router.push(path)}
        onSuccess={() => router.push(path)}
        existingCount={0}
      />
    </Box>
  );
}
