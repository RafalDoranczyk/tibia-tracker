import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

import type { Monster } from "@/modules/bestiary";

import type { HuntSessionFormValues } from "../../schemas";

type HuntSessionMonstersProps = {
  monsterList: Monster[];
};

export function HuntSessionMonsters({ monsterList }: HuntSessionMonstersProps) {
  const { control } = useFormContext<HuntSessionFormValues>();

  const monsters =
    useWatch({
      control,
      name: "monsters",
    }) ?? [];

  const findMonster = (name: string) =>
    monsterList.find((m) => m.name.toLowerCase() === name.toLowerCase());

  if (!monsters.length) {
    return (
      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(90deg, #1a1a1a, #292929)",
          color: "white",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          🧟 Killed Monsters
        </Typography>
        <Typography variant="body2" color="gray" sx={{ mt: 1 }}>
          No monsters parsed yet.
        </Typography>
      </Paper>
    );
  }

  const sortedMonsters = [...monsters].sort((a, b) => b.count - a.count);

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        background: "linear-gradient(90deg, #1a1a1a, #292929)",
        color: "white",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight="bold">
          🧟 Killed Monsters
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1.5} useFlexGap>
          {sortedMonsters.map((m) => {
            const dbMonster = findMonster(m.name);

            return (
              <Stack
                key={m.name}
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{
                  flexBasis: { xs: "100%", sm: "48%" },
                  flexGrow: 1,
                  background: "#222",
                  borderRadius: 2,
                  p: 1.5,
                  minWidth: 250,
                }}
              >
                <Avatar
                  src={dbMonster?.image_url}
                  alt={m.name}
                  sx={{ width: 40, height: 40, flexShrink: 0 }}
                />

                <Box flex={1} minWidth={0}>
                  <Typography sx={{ textTransform: "capitalize" }} variant="subtitle1" noWrap>
                    {m.name}
                  </Typography>

                  {dbMonster && (
                    <Typography variant="body2" color="gray" noWrap sx={{ fontSize: "0.8rem" }}>
                      {dbMonster.bestiary_class} • {dbMonster.exp} XP
                    </Typography>
                  )}
                </Box>

                <Typography variant="h6" fontWeight="bold" sx={{ flexShrink: 0 }}>
                  ×{m.count}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}
