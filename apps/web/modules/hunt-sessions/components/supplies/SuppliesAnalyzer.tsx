import InvertColorsRounded from "@mui/icons-material/InventoryTwoTone";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Autocomplete } from "@/components";

import type { HuntSessionForm, ItemPreview } from "../../schemas";
import { SupplyList } from "./SupplyList";

type HuntSessionSuppliesAnalyzerProps = {
  supplyList: ItemPreview[];
};

export function SuppliesAnalyzer({ supplyList }: HuntSessionSuppliesAnalyzerProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "supplies",
  });

  const usedIds = useMemo(() => fields.map((f) => f.supplyId), [fields]);
  const usedIdSet = useMemo(() => new Set(usedIds), [usedIds]);

  const supplyMap = useMemo(
    () => Object.fromEntries(supplyList.map((s) => [s.id, s])),
    [supplyList]
  );

  const options = useMemo(
    () => supplyList.filter((s) => !usedIdSet.has(s.id)),
    [supplyList, usedIdSet]
  );

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
        <InvertColorsRounded color="secondary" fontSize="small" />
        <Typography fontWeight={700}>Used Supplies</Typography>
      </Stack>

      <Divider />

      <Grid container direction={{ xs: "column", md: "row" }} spacing={4}>
        <Grid size={{ xs: 12, lg: 4 }} container direction="column" spacing={2}>
          <Typography variant="caption" color="text.secondary">
            Add the supplies you used during the hunt session from the Supply Analyzer.
          </Typography>

          <Autocomplete
            label="Add supply"
            options={options}
            onChange={(item) =>
              append({
                supplyId: item.id,
                count: 1,
              })
            }
            renderOption={(o) => (
              <Stack direction="row" gap={2} alignItems="center">
                {/* <Avatar
                  src={getImageUrl(o.image_path)}
                  sx={{ width: 24, height: 24 }}
                  variant="rounded"
                /> */}
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
