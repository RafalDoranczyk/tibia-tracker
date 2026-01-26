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

/* ------------------------- Picker ------------------------- */
type DamageElementPickerProps = {
  damageElements: DamageElement[];
  usedIds: number[];
  onAdd: (item: DamageElement) => void;
};

function DamageElementPicker({ damageElements, usedIds, onAdd }: DamageElementPickerProps) {
  const options = useMemo(
    () =>
      damageElements.map((d) => ({
        ...d,
        disabled: usedIds.includes(d.id),
      })),
    [damageElements, usedIds]
  );

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Autocomplete
        label="Add damage element"
        options={options.filter((o) => !o.disabled)}
        onChange={onAdd}
        renderOption={(o) => (
          <Stack direction="row" gap={1.5} alignItems="center">
            <Avatar src={o.image_url} sx={{ width: 24, height: 24 }} variant="rounded" />
            {o.name}
          </Stack>
        )}
      />
    </Stack>
  );
}

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
          src={element?.image_url}
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

  return (
    <Stack spacing={2}>
      <DamageElementPicker
        damageElements={damageElementList}
        usedIds={usedIds}
        onAdd={(item) =>
          append({
            id: item.id,
            name: item.name,
            percent: 0,
          })
        }
      />

      {/* Section Header */}
      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
        <LocalFireDepartmentIcon color="error" fontSize="small" />
        <Typography fontWeight={700}>Damage Elements</Typography>
      </Stack>
      <Divider />

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No damage elements added yet
        </Typography>
      ) : (
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
