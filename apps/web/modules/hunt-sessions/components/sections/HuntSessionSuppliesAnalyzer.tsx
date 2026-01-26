import InvertColorsRounded from "@mui/icons-material/InventoryTwoTone";
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

import type { HuntSessionFormValues, SupplyItem } from "../../types";
import { HuntSessionSection } from "./HuntSessionSection";

type SupplyPickerProps = {
  supplyList: SupplyItem[];
  usedIds: number[];
  onAdd: (item: SupplyItem) => void;
};

function SupplyPicker({ supplyList, usedIds, onAdd }: SupplyPickerProps) {
  const options = useMemo(
    () => supplyList.filter((s) => !usedIds.includes(s.id)),
    [supplyList, usedIds]
  );

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Autocomplete
        label="Add supply"
        options={options}
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

type SupplyListProps = {
  fields: FieldArrayWithId<HuntSessionFormValues, "supplies", "id">[];
  remove: (index: number) => void;
  control: Control<HuntSessionFormValues>;
  supplyMap: Map<number, SupplyItem>;
};

function SupplyList({ fields, remove, control, supplyMap }: SupplyListProps) {
  const watchedSupplies = useWatch({ control, name: "supplies" });

  return (
    <Stack spacing={1}>
      {/* Header */}
      <Stack direction="row" spacing={2} px={1}>
        <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
          Supply
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ width: 90 }}>
          Count
        </Typography>
        <Box sx={{ width: 32 }} />
      </Stack>

      <Divider />

      {/* Rows */}
      {fields.map((field, i) => {
        const actualId = watchedSupplies?.[i]?.id;
        const supply = actualId ? supplyMap.get(actualId) : null;

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
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
              <Avatar src={supply?.image_url} sx={{ width: 28, height: 28 }} variant="rounded" />
              <Typography variant="body2" fontWeight={500}>
                {supply?.name}
              </Typography>
            </Stack>

            <ControlledTextField
              size="small"
              control={control}
              name={`supplies.${i}.count`}
              type="number"
              sx={{ width: 90 }}
            />

            <TooltipIconButton variant="delete" onClick={() => remove(i)} />
          </Stack>
        );
      })}
    </Stack>
  );
}

type HuntSessionSuppliesAnalyzerProps = {
  supplyList: SupplyItem[];
};

export function HuntSessionSuppliesAnalyzer({ supplyList }: HuntSessionSuppliesAnalyzerProps) {
  const { control } = useFormContext<HuntSessionFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "supplies",
  });

  const usedIds = useWatch({ control, name: "supplies" })?.map((s) => s.id) ?? [];

  const supplyMap = useMemo(() => new Map(supplyList.map((s) => [s.id, s])), [supplyList]);

  return (
    <HuntSessionSection title="Supplies Analyzer">
      <Stack spacing={2}>
        <SupplyPicker
          supplyList={supplyList}
          usedIds={usedIds}
          onAdd={(item) =>
            append({
              id: item.id,
              name: item.name,
              count: 100,
            })
          }
        />

        <div>
          <Stack direction="row" alignItems="center" gap={1} mb={1}>
            <InvertColorsRounded color="secondary" fontSize="small" />
            <Typography variant="subtitle2" fontWeight="bold">
              Used Supplies
            </Typography>
          </Stack>
          <Divider />
        </div>

        {fields.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No supplies added yet
          </Typography>
        ) : (
          <SupplyList fields={fields} remove={remove} control={control} supplyMap={supplyMap} />
        )}
      </Stack>
    </HuntSessionSection>
  );
}
