"use client";

import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { Box, Grid } from "@mui/material";
import { useMemo } from "react";
import { type FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";
import { EmptyState } from "@/components";
import type { HuntSessionForm, MonsterPreview } from "../../../schemas";
import { SectionPaperCard } from "../SectionPaperCard";
import { StatProgressBarRow } from "./StatProgressBarRow";

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
    <Box height="100%">
      <SectionPaperCard
        title="Damage Sources"
        icon={<TrackChangesIcon fontSize="small" color="primary" />}
      >
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
    </Box>
  );
}
