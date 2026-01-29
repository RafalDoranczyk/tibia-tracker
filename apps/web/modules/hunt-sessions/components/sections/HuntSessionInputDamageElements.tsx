"use client";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartmentSharp";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { Autocomplete, ControlledTextField, TooltipIconButton } from "@/components";

import type { DamageElement, HuntSessionFormValues } from "../../types";

/* ------------------------- Row ------------------------- */

type DamageElementRowProps = {
  i: number;
  field: FieldArrayWithId<HuntSessionFormValues, "damage_elements", "id">;
  remove: (index: number) => void;
  control: Control<HuntSessionFormValues>;
  damageElementMap: Map<number, DamageElement>;
};

function DamageElementRow({ i, field, remove, control, damageElementMap }: DamageElementRowProps) {
  const id = useWatch({ control, name: `damage_elements.${i}.id` });
  const element = id ? damageElementMap.get(id) : null;

  return (
    <Stack
      key={field.id}
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
      {/* Element */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
        <Avatar
          src={element?.image_path}
          alt={element?.name}
          sx={{ width: 28, height: 28 }}
          variant="rounded"
        />
        <Typography variant="body2" fontWeight={500}>
          {element?.name}
        </Typography>
      </Stack>

      {/* Percent */}
      <ControlledTextField
        size="small"
        control={control}
        name={`damage_elements.${i}.percent`}
        type="number"
        sx={{ width: 90 }}
      />

      {/* Delete */}
      <TooltipIconButton variant="delete" onClick={() => remove(i)} />
    </Stack>
  );
}

/* ------------------------- List ------------------------- */

type DamageElementListProps = {
  fields: FieldArrayWithId<HuntSessionFormValues, "damage_elements", "id">[];
  remove: (index: number) => void;
  control: Control<HuntSessionFormValues>;
  damageElementMap: Map<number, DamageElement>;
};

function DamageElementList({ fields, remove, control, damageElementMap }: DamageElementListProps) {
  return (
    <Stack spacing={1}>
      {/* Header */}
      <Stack direction="row" spacing={2} px={1}>
        <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
          Element
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ width: 90 }}>
          Percent
        </Typography>
        <Box sx={{ width: 32 }} />
      </Stack>

      <Divider />

      {fields.map((field, i) => (
        <DamageElementRow
          key={field.id}
          i={i}
          field={field}
          remove={remove}
          control={control}
          damageElementMap={damageElementMap}
        />
      ))}
    </Stack>
  );
}

/* ------------------------- Main Component ------------------------- */

type HuntSessionInputDamageElementsProps = {
  damageElementList: DamageElement[];
};

export function HuntSessionInputDamageElements({
  damageElementList,
}: HuntSessionInputDamageElementsProps) {
  const { control } = useFormContext<HuntSessionFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "damage_elements",
  });

  const usedIds = useWatch({ control, name: "damage_elements" })?.map((s) => s.id) ?? [];

  const damageElementMap = useMemo(
    () => new Map<number, DamageElement>(damageElementList.map((s) => [s.id, s])),
    [damageElementList]
  );

  const options = useMemo(
    () =>
      damageElementList.map((d) => ({
        ...d,
        disabled: usedIds.includes(d.id),
      })),
    [damageElementList, usedIds]
  );

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
        <LocalFireDepartmentIcon color="error" fontSize="small" />
        <Typography fontWeight={700}>Damage Elements</Typography>
      </Stack>

      <Divider />

      <Typography maxWidth={650} variant="caption" color="text.secondary">
        Add the damage elements you received during the hunt session. Tibia only reports damage from
        the last few seconds, so this data is approximate, but it can still give useful insights.
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <Autocomplete
          label="Add damage element"
          options={options.filter((o) => !o.disabled)}
          onChange={(item) =>
            append({
              id: item.id,
              name: item.name,
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
      </Stack>

      {fields.length !== 0 && (
        <DamageElementList
          fields={fields}
          remove={remove}
          control={control}
          damageElementMap={damageElementMap}
        />
      )}
    </Stack>
  );
}
