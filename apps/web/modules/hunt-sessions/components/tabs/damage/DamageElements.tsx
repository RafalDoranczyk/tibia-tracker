"use client";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartmentSharp";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Autocomplete, EmptyState } from "@/components";

import type { DamageElement, HuntSessionForm } from "../../../schemas";
import { DamageElementList } from "../DamageElementList";
import { SectionHeader } from "../SectionHeader";
import { SectionPaperCard } from "../SectionPaperCard";

type DamageElementsProps = {
  damageElementList: DamageElement[];
};

export function DamageElements({ damageElementList }: DamageElementsProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "damage_elements",
  });

  const usedIds = useMemo(() => fields.map((f) => f.damageElementId), [fields]);

  const damageElementMap = useMemo(
    () => Object.fromEntries(damageElementList.map((e) => [e.id, e])),
    [damageElementList]
  );

  const options = useMemo(
    () => damageElementList.filter((d) => !usedIds.includes(d.id)),
    [damageElementList, usedIds]
  );

  const items = useMemo(
    () =>
      fields.map((field, i) => {
        const element = damageElementMap[field.damageElementId];

        return {
          id: field.id,
          image: element?.image_path,
          label: element?.name ?? `Unknown element #${field.damageElementId}`,
          percentFieldName: `damage_elements.${i}.percent` as const,
          onDelete: () => remove(i),
        };
      }),
    [fields, damageElementMap, remove]
  );

  return (
    <Stack spacing={2}>
      <SectionHeader
        icon={<LocalFireDepartmentIcon color="error" fontSize="small" />}
        title="Damage Elements"
      />

      <Typography maxWidth={650} variant="caption" color="text.secondary">
        Add the damage elements you received during the hunt session. Tibia only reports damage from
        the last few seconds, so this data is approximate, but it can still give useful insights.
      </Typography>

      <SectionPaperCard>
        <Stack spacing={2}>
          <Box maxWidth={300}>
            <Autocomplete
              label="Add damage element"
              options={options}
              onChange={(item) =>
                append({
                  damageElementId: item.id,
                  percent: 0,
                })
              }
              renderOption={(o) => (
                <Stack direction="row" gap={1.5} alignItems="center">
                  <Avatar src={o.image_path} sx={{ width: 24, height: 24 }} variant="rounded" />
                  {o.name}
                </Stack>
              )}
            />
          </Box>

          {fields.length > 0 ? (
            <DamageElementList items={items} control={control} />
          ) : (
            <EmptyState size="small" title="No damage elements added" variant="hunt" />
          )}
        </Stack>
      </SectionPaperCard>
    </Stack>
  );
}
