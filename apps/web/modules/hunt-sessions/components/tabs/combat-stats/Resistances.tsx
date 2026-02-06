"use client";

import { Avatar, Box, Stack } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Autocomplete, EmptyState } from "@/components";

import type { DamageElement, HuntSessionForm } from "../../../schemas";
import { DamageElementList } from "../DamageElementList";
import { SectionPaperCard } from "../SectionPaperCard";

type ResistancesProps = {
  damageElementList: DamageElement[];
  elementResistanceStatId: string; // stat_definitions.id for "element_resistance"
};

export function Resistances({ damageElementList, elementResistanceStatId }: ResistancesProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stats",
  });

  /* ======================================
     Filter only elemental resistance stats
  ====================================== */

  const elementalStats = useMemo(
    () =>
      fields.filter(
        (s) => s.statDefinitionId === elementResistanceStatId && s.damageElementId != null
      ),
    [fields, elementResistanceStatId]
  );

  const usedElementIds = useMemo(
    () => new Set(elementalStats.map((s) => s.damageElementId)),
    [elementalStats]
  );

  const availableElements = useMemo(
    () => damageElementList.filter((el) => !usedElementIds.has(el.id)),
    [damageElementList, usedElementIds]
  );

  const damageElementMap = useMemo(
    () => Object.fromEntries(damageElementList.map((e) => [e.id, e])),
    [damageElementList]
  );

  const items = elementalStats.map((stat) => {
    const element = stat.damageElementId ? damageElementMap[stat.damageElementId] : undefined;
    const fieldIndex = fields.findIndex((f) => f.id === stat.id);

    return {
      id: stat.id,
      image: element?.image_path,
      label: element?.name ?? "Unknown element",
      percentFieldName: `stats.${fieldIndex}.value` as const,
      onDelete: () => remove(fieldIndex),
    };
  });

  return (
    <SectionPaperCard>
      <Stack spacing={2}>
        {/* ADD ELEMENT */}
        <Box maxWidth={300}>
          <Autocomplete
            label="Add elemental resistance"
            options={availableElements}
            onChange={(item) =>
              append({
                statDefinitionId: elementResistanceStatId,
                damageElementId: item.id,
                value: 0,
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

        {items.length > 0 ? (
          <DamageElementList items={items} control={control} />
        ) : (
          <EmptyState size="small" title="No elemental resistances added" variant="hunt" />
        )}
      </Stack>
    </SectionPaperCard>
  );
}
