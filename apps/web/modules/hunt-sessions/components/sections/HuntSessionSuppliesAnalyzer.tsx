import InvertColorsRounded from "@mui/icons-material/InventoryTwoTone";
import { Avatar, Divider, Grid, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { Autocomplete, ControlledTextField, TooltipIconButton } from "@/components";
import { getImageUrl } from "@/lib/supabase";

import type { HuntSessionFormValues, SupplyItem } from "../../types";

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
      <Grid container spacing={1}>
        {fields.map((field, i) => {
          const actualId = watchedSupplies?.[i]?.id;
          const supply = actualId ? supplyMap.get(actualId) : null;

          return (
            <Grid key={field.id} size={{ xs: 12, xl: 6 }}>
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
                    src={supply?.image_path}
                    sx={{ width: 28, height: 28 }}
                    variant="rounded"
                  />
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
            </Grid>
          );
        })}
      </Grid>
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
  4;
  const options = useMemo(
    () => supplyList.filter((s) => !usedIds.includes(s.id)),
    [supplyList, usedIds]
  );

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
        <InvertColorsRounded color="secondary" fontSize="small" />
        <Typography fontWeight={700}>Used Supplies</Typography>
      </Stack>

      <Divider />

      <Grid container direction={{ xs: "column", md: "row" }} spacing={4}>
        <Grid size={{ xs: 12, lg: 4 }} spacing={2} container direction="column">
          <Typography variant="caption" color="text.secondary">
            Add the supplies you used during the hunt session from the Supply Analyzer.
          </Typography>

          <Autocomplete
            label="Add supply"
            options={options}
            onChange={(item) =>
              append({
                id: item.id,
                name: item.name,
                count: 100,
              })
            }
            renderOption={(o) => (
              <Stack direction="row" gap={2} alignItems="center">
                <Avatar
                  src={getImageUrl(o.image_path)}
                  sx={{ width: 24, height: 24 }}
                  variant="rounded"
                />
                {o.name}
              </Stack>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          {fields.length !== 0 && (
            <SupplyList fields={fields} remove={remove} control={control} supplyMap={supplyMap} />
          )}
        </Grid>
      </Grid>
    </Stack>
  );
}
