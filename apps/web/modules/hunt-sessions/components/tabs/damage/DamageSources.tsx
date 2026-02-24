"use client";

import { Grid, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { type FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";

import { EmptyState } from "@/components";
import type { HuntSessionForm, MonsterPreview } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
import { SectionPaperCard } from "../SectionPaperCard";
import { StatProgressBarRow } from "../StatProgressBarRow";

type DamageSourceField = FieldArrayWithId<HuntSessionForm, "monster_damage_sources"> & {
  monsterId: number;
};

type DamageSourcesProps = {
  monsterList: MonsterPreview[];
};

export function DamageSources({ monsterList }: DamageSourcesProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields } = useFieldArray({
    control,
    name: "monster_damage_sources",
  });

  const sourceMap = useMemo(
    () => Object.fromEntries(monsterList.map((s) => [s.id, s])),
    [monsterList]
  );

  return (
    <Stack spacing={2}>
      <SectionHeader title="Damage Sources" size="small">
        <Typography variant="caption" color="text.secondary">
          Damage sources are the monsters that dealt damage to you during the hunt session. It will
          auto populate when you upload a log file with the damage sources feature enabled in the
          log parser.
        </Typography>
      </SectionHeader>

      <SectionPaperCard>
        {fields.length === 0 ? (
          <EmptyState size="small" title="Upload log to see sources" variant="monsters" />
        ) : (
          <Grid container spacing={1}>
            {fields.map((field, i) => {
              const typedField = field as DamageSourceField;
              const source = sourceMap[typedField.monsterId];

              return (
                <Grid key={field.id} size={{ xs: 12, md: 6 }}>
                  <StatProgressBarRow
                    control={control}
                    name={`monster_damage_sources.${i}.percent`}
                    label={source?.name ?? `Unknown #${typedField.monsterId}`}
                    image={source?.image_path}
                    iconIsFullUrl
                    color="info"
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </SectionPaperCard>
    </Stack>
  );
}
