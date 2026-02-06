import { Avatar, Grid, Stack, Typography } from "@mui/material";
import type { Control, FieldArrayWithId } from "react-hook-form";

import { ControlledTextField, TooltipIconButton } from "@/components";
import { getPublicAssetUrl } from "@/core/supabase";

import type { HuntSessionForm, ItemPreview } from "../../../schemas";

type SupplyField = FieldArrayWithId<HuntSessionForm, "supplies"> & {
  supplyId: number;
};

type SupplyListProps = {
  fields: SupplyField[];
  remove: (index: number) => void;
  control: Control<HuntSessionForm>;
  supplyMap: Record<number, ItemPreview>;
};

export function SupplyList({ fields, remove, control, supplyMap }: SupplyListProps) {
  return (
    <Stack spacing={1}>
      <Grid container spacing={1}>
        {fields.map((field, i) => {
          const supply = supplyMap[field.supplyId];

          return (
            <Grid key={field.id} size={{ xs: 12, md: 6, xl: 3 }}>
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
    </Stack>
  );
}
