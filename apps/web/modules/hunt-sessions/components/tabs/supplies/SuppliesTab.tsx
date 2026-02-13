import HealthAndSafety from "@mui/icons-material/HealthAndSafety";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Autocomplete, EmptyState } from "@/components";
import { getPublicAssetUrl } from "@/core/assets";
import type { ItemPreview } from "@/modules/items";

import type { HuntSessionForm } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
import { SectionPaperCard } from "../SectionPaperCard";
import { SupplyList } from "./SupplyList";

type SuppliesTabProps = {
  supplyList: ItemPreview[];
};

export function SuppliesTab({ supplyList }: SuppliesTabProps) {
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
      <SectionHeader
        title="Used Supplies"
        icon={<HealthAndSafety color="success" fontSize="small" />}
      />

      <Typography variant="caption" color="text.secondary">
        Add the supplies you used during the hunt session from the Supply Analyzer.
      </Typography>

      <SectionPaperCard>
        <Stack spacing={2}>
          <Box maxWidth={300}>
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
                  <Avatar
                    src={getPublicAssetUrl(o.image_path)}
                    sx={{ width: 24, height: 24 }}
                    variant="rounded"
                  />
                  {o.name}
                </Stack>
              )}
            />
          </Box>

          {fields.length !== 0 ? (
            <SupplyList fields={fields} remove={remove} control={control} supplyMap={supplyMap} />
          ) : (
            <EmptyState size="small" title="No supplies added" variant="economy" />
          )}
        </Stack>
      </SectionPaperCard>
    </Stack>
  );
}
