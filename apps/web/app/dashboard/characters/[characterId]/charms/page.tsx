import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockOpenIcon from "@mui/icons-material/LockSharp";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Box,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import { CharmsResetButton, CharmsView, loadCharmsPage } from "@/modules/charms";

import type { CharacterPageProps } from "../../../types";

export const metadata: Metadata = {
  title: "Charms",
  description: "Manage your character's charms and track your charm points.",
};

export default async function Charms({ params }: CharacterPageProps) {
  const { characterId } = await params;

  const { charms, charmEconomy, totalCharmPoints, progress } = await loadCharmsPage(characterId);

  const { major_available, minor_available, major_unlocked, minor_unlocked } = charmEconomy;

  const stats = [
    {
      label: "Available Major / Minor",
      value: `${major_available} / ${minor_available}`,
      color: "info.main",
      icon: <LockOpenIcon />,
    },
    {
      label: "Used Major / Minor",
      value: `${major_unlocked - major_available} / ${minor_unlocked - minor_available}`,
      color: "warning.main",
      icon: <WhatshotIcon />,
    },
    {
      label: "Unlocked Major / Minor",
      value: `${major_unlocked} / ${minor_unlocked}`,
      color: "success.main",
      icon: <CheckCircleIcon />,
    },
    {
      label: "Total",
      value: totalCharmPoints,
      color: "text.primary",
      icon: <AllInclusiveIcon />,
    },
  ] as const;

  return (
    <>
      <PageHeader
        title="Charms"
        description="Your character charms are based on your bestiary progress and can be managed here.
         Unlock new bestiary to gain more charm points and be able to unlock more charms."
        action={
          <Box ml="auto">
            <CharmsResetButton characterId={characterId} majorCharmsUnlocked={major_unlocked} />
          </Box>
        }
      />

      <Container maxWidth="xl">
        <Box mb={2}>
          <Typography variant="caption" color="text.secondary">
            Charm Progress ({Math.round(progress)}%)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
            }}
          />
        </Box>

        <Stack direction="row" spacing={2} mb={2}>
          {stats.map((s) => (
            <Card key={s.label} sx={{ flex: 1, borderRadius: 3 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box color={s.color}>{s.icon}</Box>
                  <Typography variant="caption" color="text.secondary">
                    {s.label}
                  </Typography>
                </Stack>

                <Typography variant="h4" fontWeight={800} color={s.color}>
                  {s.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>

      <CharmsView
        availableMajorPoints={major_available}
        availableMinorPoints={minor_available}
        charms={charms}
      />
    </>
  );
}
