"use client";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartmentSharp";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
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

type DamageElementPickerProps = {
  damageElements: DamageElement[];
  usedIds: number[];
  onAdd: (item: DamageElement) => void;
};

function DamageElementPicker({ damageElements, usedIds, onAdd }: DamageElementPickerProps) {
  const options = useMemo(
    () => damageElements.filter((d) => !usedIds.includes(d.id)),
    [damageElements, usedIds]
  );

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Autocomplete
        label="Add damage element"
        options={options}
        isLoading={false}
        onChange={onAdd}
        renderOption={(o) => (
          <Stack direction="row" gap={2} alignItems="center">
            <Avatar src={o.image_url} sx={{ width: 24, height: 24 }} variant="rounded" />
            {o.name}
          </Stack>
        )}
      />
    </Stack>
  );
}

type DamageElementListProps = {
  fields: FieldArrayWithId<HuntSessionFormValues, "damage_elements", "id">[];
  remove: (index: number) => void;
  control: Control<HuntSessionFormValues>;
  damageElementMap: Map<number, DamageElement>;
};

function DamageElementList({ fields, remove, control, damageElementMap }: DamageElementListProps) {
  const watchedDamageElements = useWatch({
    control,
    name: "damage_elements",
  });

  return (
    <Stack spacing={2}>
      {fields.map((field, i) => {
        const actualId = watchedDamageElements?.[i]?.id;
        const damageElement = actualId ? damageElementMap.get(actualId) : null;

        return (
          <Stack key={field.id} direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                src={damageElement?.image_url}
                alt={damageElement?.name}
                sx={{ width: 28, height: 28 }}
                variant="rounded"
              />

              <Typography>{damageElement?.name}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <ControlledTextField
                size="small"
                control={control}
                name={`damage_elements.${i}.percent`}
                type="number"
                label="Percent"
                sx={{ width: 90 }}
              />

              <TooltipIconButton variant="delete" onClick={() => remove(i)} />
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}

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
    () => new Map(damageElementList.map((s) => [s.id, s])),
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

      <div>
        <Stack direction="row" alignItems="center" gap={1} mb={1}>
          <LocalFireDepartmentIcon fontSize="small" />
          <Typography variant="subtitle2" fontWeight="bold">
            Damage Elements
          </Typography>
        </Stack>
        <Divider />
      </div>

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
