"use client";

import BugReportSharp from "@mui/icons-material/BugReportSharp";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import { ControlledTextField, EmptyState } from "@/components";

import type { HuntSessionForm, MonsterPreview } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
import { SectionPaperCard } from "../SectionPaperCard";

type DamageSourceField = FieldArrayWithId<HuntSessionForm, "monster_damage_sources"> & {
  monsterId: number;
};

type DamageSourceRowProps = {
  i: number;
  field: DamageSourceField;
  control: Control<HuntSessionForm>;
  disabled: boolean;
  sourceMap: Record<number, MonsterPreview>;
};

function DamageSourceRow({ i, field, control, disabled, sourceMap }: DamageSourceRowProps) {
  const source = sourceMap[field.monsterId];

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      px={1}
      py={0.5}
      sx={{
        borderRadius: 1,
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
        <Avatar
          src={source?.image_path}
          alt={source?.name}
          sx={{ width: 28, height: 28 }}
          variant="rounded"
        />
        <Typography variant="body2" fontWeight={500}>
          {source?.name ?? `Unknown source #${field.monsterId}`}
        </Typography>
      </Stack>

      {/* Percent */}
      <ControlledTextField
        disabled={disabled}
        size="small"
        control={control}
        name={`monster_damage_sources.${i}.percent`}
        type="number"
        sx={{ width: 90 }}
      />
    </Stack>
  );
}

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
      <SectionHeader
        icon={<BugReportSharp color="info" fontSize="small" />}
        title="Damage Sources"
      />

      <Typography maxWidth={650} variant="caption" color="text.secondary">
        Damage sources represent the monsters you have fought during this hunt session. It can be
        usefull in the future to analyze which monsters are causing you the most damage to use
        defense prey bonuses.
      </Typography>

      <SectionPaperCard>
        {fields.length === 0 ? (
          <EmptyState
            size="small"
            title="Upload session log to adjust damage sources"
            variant="monsters"
          />
        ) : (
          <Stack spacing={1}>
            {/* Header row */}
            <Stack direction="row" spacing={2} px={1}>
              <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
                Source
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ width: 90 }}>
                Percent
              </Typography>
            </Stack>

            <Divider />

            {/* Rows */}
            {fields.map((field, i) => (
              <DamageSourceRow
                key={field.id}
                i={i}
                field={field as DamageSourceField}
                control={control}
                disabled={fields.length === 1}
                sourceMap={sourceMap}
              />
            ))}
          </Stack>
        )}
      </SectionPaperCard>
    </Stack>
  );
}
