import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import type { AIMonsterScan } from "../../schemas";
import { MonsterPortraitFrame } from "../MonsterPortraitFrame";

type MonsterScanCardProps = {
  monster: AIMonsterScan;
};

export function MonsterScanCard({ monster }: MonsterScanCardProps) {
  const { name, stage, has_soul, image_path } = monster;

  return (
    <Card
      variant="outlined"
      sx={{
        p: 1.5,
        py: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "rgba(255, 255, 255, 0.02)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        "&:hover": { borderColor: "secondary.main" },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        {has_soul ? (
          <MonsterPortraitFrame
            src={image_path || "/images/monsters/unknown.png"}
            alt={name}
            size={48}
          />
        ) : (
          <Avatar
            src={image_path || undefined}
            variant="rounded"
            sx={{
              width: 48,
              height: 48,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              "& img": { objectFit: "contain", p: 0.5 },
            }}
          />
        )}

        <Box>
          <Typography variant="body2" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Stage {stage}/3
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1}>
        {stage === 3 ? (
          <CheckCircleIcon sx={{ fontSize: 18, color: "#4ade80" }} />
        ) : (
          <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: "text.disabled" }} />
        )}
      </Stack>
    </Card>
  );
}
