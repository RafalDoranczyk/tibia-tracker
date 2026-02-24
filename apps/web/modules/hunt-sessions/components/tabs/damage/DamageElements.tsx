"use client";

import { Grid, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EmptyState } from "@/components";
import type { DamageElement } from "@/modules/damage-elements";
import type { HuntSessionForm } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
import { SectionPaperCard } from "../SectionPaperCard";
import { StatProgressBarRow } from "../StatProgressBarRow";

type DamageElementsProps = {
  damageElementList: DamageElement[];
};

export function DamageElements({ damageElementList }: DamageElementsProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields } = useFieldArray({
    control,
    name: "damage_elements",
  });

  const damageElementMap = useMemo(
    () => Object.fromEntries(damageElementList.map((e) => [e.id, e])),
    [damageElementList]
  );

  return (
    <Stack spacing={2}>
      <SectionHeader title="Damage Elements" size="small">
        <Typography variant="caption" color="text.secondary">
          Damage elements are the types of damage dealt by monsters during the hunt session. It will
          auto populate when you upload a log file with the damage elements feature enabled in the
          log parser.
        </Typography>
      </SectionHeader>

      <SectionPaperCard>
        {fields.length > 0 ? (
          <SectionPaperCard>
            {fields.length === 0 ? (
              <EmptyState size="small" title="Upload log to see elements" variant="hunt" />
            ) : (
              <Grid container spacing={1}>
                {fields.map((field, i) => {
                  const typedField = field;
                  const element = damageElementMap[typedField.damageElementId];

                  return (
                    <Grid key={field.id} size={{ xs: 12, md: 6 }}>
                      <StatProgressBarRow
                        control={control}
                        name={`damage_elements.${i}.percent`}
                        label={element?.name ?? `Unknown #${typedField.damageElementId}`}
                        image={element?.image_path}
                        color="secondary"
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </SectionPaperCard>
        ) : (
          <EmptyState size="small" title="Upload log to see elements" variant="hunt" />
        )}
      </SectionPaperCard>
    </Stack>
  );
}
