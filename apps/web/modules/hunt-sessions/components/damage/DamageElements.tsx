"use client";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartmentSharp";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import { Autocomplete, ControlledTextField, TooltipIconButton } from "@/components";

import type { DamageElement, HuntSessionForm } from "../../types";

// RHF field with domain id
type DamageElementField = FieldArrayWithId<HuntSessionForm, "damage_elements", "id"> & {
  damageElementId: number;
};

type DamageElementRowProps = {
  i: number;
  field: DamageElementField;
  remove: (index: number) => void;
  control: Control<HuntSessionForm>;
  damageElementMap: Record<number, DamageElement>;
};

type DamageElementListProps = {
  fields: DamageElementField[];
  remove: (index: number) => void;
  control: Control<HuntSessionForm>;
  damageElementMap: Record<number, DamageElement>;
};

type DamageElementsProps = {
  damageElementList: DamageElement[];
};

function DamageElementRow({ i, field, remove, control, damageElementMap }: DamageElementRowProps) {
  const element = damageElementMap[field.damageElementId];

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
      {/* Element */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
        <Avatar
          src={element?.image_path}
          alt={element?.name}
          sx={{ width: 28, height: 28 }}
          variant="rounded"
        />
        <Typography variant="body2" fontWeight={500}>
          {element?.name ?? `Unknown element #${field.damageElementId}`}
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

export function DamageElements({ damageElementList }: DamageElementsProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "damage_elements",
  });

  const usedIds = useMemo(() => fields.map((f) => f.damageElementId), [fields]);

  // Catalog lookup map (faster than Map in React render)
  const damageElementMap = useMemo(
    () => Object.fromEntries(damageElementList.map((e) => [e.id, e])),
    [damageElementList]
  );

  // Filter available options
  const options = useMemo(
    () => damageElementList.filter((d) => !usedIds.includes(d.id)),
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
