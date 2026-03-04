import HealthAndSafety from "@mui/icons-material/HealthAndSafety";
import InventoryTwoTone from "@mui/icons-material/InventoryTwoTone";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import type { ItemPreview } from "@repo/database";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Autocomplete, ControlledTextField, EmptyState, TooltipIconButton } from "@/components";
import { getPublicAssetUrl } from "@/core/assets";
import type { HuntSessionForm } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
import { SectionPaperCard } from "../SectionPaperCard";

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
    <Box>
      <SectionHeader
        title="Supplies Analyser"
        icon={<InventoryTwoTone color="secondary" fontSize="small" />}
        description="Add the supplies you used during the hunt session from the Supply Analyzer."
      />

      <Box maxWidth={850}>
        <SectionPaperCard
          title="Supplies"
          icon={<HealthAndSafety color="primary" fontSize="small" />}
        >
          <Stack spacing={2}>
            <Autocomplete
              label="Search Supply"
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

            {fields.length !== 0 ? (
              <Grid container spacing={1}>
                {fields.map((field, i) => {
                  const supply = supplyMap[field.supplyId];

                  return (
                    <Grid key={field.id} size={{ xs: 12, md: 6 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        px={1}
                        py={0.5}
                        sx={{ borderRadius: 1, "&:hover": { bgcolor: "action.hover" } }}
                      >
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
                          <Avatar
                            src={getPublicAssetUrl(supply?.image_path)}
                            sx={{ width: 28, height: 28 }}
                            variant="rounded"
                          />
                          <Typography variant="body2" fontWeight={500}>
                            {supply?.name ?? `Unknown supply #${field.supplyId}`}
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
            ) : (
              <EmptyState size="small" title="No supplies added" variant="economy" />
            )}
          </Stack>
        </SectionPaperCard>
      </Box>
    </Box>
  );
}
