import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockOpenIcon from "@mui/icons-material/LockSharp";
import {
  Box,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import type { CharacterCharmEconomy } from "../schemas";

type CharmStatsProps = {
  charmEconomy: CharacterCharmEconomy;
  totalCharmPoints: number;
  progress: number;
};

export function CharmStats({ charmEconomy, totalCharmPoints, progress }: CharmStatsProps) {
  const { major_available, minor_available, major_unlocked, minor_unlocked } = charmEconomy;

  const stats = [
    {
      label: "Major Charms",
      value: `${major_available} / ${major_unlocked}`,
      color: "success.main",
      icon: <CheckCircleIcon />,
    },
    {
      label: "Minor Charms",
      value: `${minor_available} / ${minor_unlocked}`,
      color: "info.light",
      icon: <LockOpenIcon />,
    },
    {
      label: "Total Major Points",
      value: totalCharmPoints,
      color: "text.primary",
      icon: <AllInclusiveIcon />,
    },
  ] as const;

  return (
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
  );
}
