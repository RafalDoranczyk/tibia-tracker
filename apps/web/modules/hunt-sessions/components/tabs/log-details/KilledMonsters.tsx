import BugReportOutlined from "@mui/icons-material/BugReportOutlined";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import type { CharacterCharmDetailed } from "@repo/database/character-charms";
import type { MonsterPreview } from "@repo/database/hunt-sessions";
import type { PreyBonus } from "@repo/database/prey-bonuses";
import { useMemo } from "react";
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { EmptyState } from "@/components";
import type { HuntSessionForm } from "@/modules/hunt-sessions/schemas";
import { SectionPaperCard } from "../SectionPaperCard";
import { CharmChipEditor } from "./CharmChipEditor";
import { PreyChipEditor } from "./PreyChipEditor";

function getAvailableCharms(
  allCharms: CharacterCharmDetailed[],
  monsters: { charmBonusId?: number | null }[],
  currentCharmId?: number | null
) {
  const selectedCharmIds = new Set(monsters.map((m) => m.charmBonusId).filter(Boolean));

  return allCharms.filter((charm) => {
    if (charm.charm_id === currentCharmId) return true;
    return !selectedCharmIds.has(charm.charm_id);
  });
}

type KilledMonstersProps = {
  preyBonusList: PreyBonus[];
  monsterList: MonsterPreview[];
  characterCharmList: CharacterCharmDetailed[];
};

export function KilledMonsters({
  preyBonusList,
  monsterList,
  characterCharmList,
}: KilledMonstersProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields } = useFieldArray({
    control,
    name: "killed_monsters",
  });

  const watchedMonsters = useWatch({
    control,
    name: "killed_monsters",
  });

  const monsterMap = useMemo(() => new Map(monsterList.map((m) => [m.id, m])), [monsterList]);

  return (
    <SectionPaperCard
      title="Killed Monsters"
      icon={<BugReportOutlined fontSize="small" color="primary" />}
    >
      <Stack spacing={2}>
        {fields.length === 0 ? (
          <EmptyState size="small" variant="monsters" title="No monsters tracked yet" />
        ) : (
          <Stack spacing={1}>
            {fields.map((field, index) => {
              const monster = monsterMap.get(field.monsterId);

              return (
                <Stack
                  key={field.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  {/* LEFT */}
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar src={monster?.image_path} sx={{ width: 28, height: 28 }} />
                    <Box>
                      <Typography fontWeight={600}>
                        {monster?.name ?? `Unknown #${field.monsterId}`}
                      </Typography>
                      <Typography variant="caption">×{field.count}</Typography>
                    </Box>
                  </Stack>

                  {/* RIGHT */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Controller
                      control={control}
                      name={`killed_monsters.${index}.preyBonusId`}
                      render={({ field }) => (
                        <PreyChipEditor
                          value={field.value}
                          preyBonusList={preyBonusList}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`killed_monsters.${index}.charmBonusId`}
                      render={({ field }) => (
                        <CharmChipEditor
                          value={field.value}
                          characterCharmList={getAvailableCharms(
                            characterCharmList,
                            watchedMonsters ?? [],
                            field.value
                          )}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        )}
      </Stack>
    </SectionPaperCard>
  );
}
