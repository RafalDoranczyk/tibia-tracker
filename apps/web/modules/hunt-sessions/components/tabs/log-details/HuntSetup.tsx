import BuildIcon from "@mui/icons-material/Build";
import { Autocomplete, Stack, TextField } from "@mui/material";
import type { HuntPlace } from "@repo/database/hunt-places";
import { Controller, useFormContext } from "react-hook-form";
import { ControlledSelect, ControlledTextField } from "@/components";
import type { HuntSessionForm } from "../../../schemas";
import { SectionPaperCard } from "../SectionPaperCard";

type HuntSetupProps = {
  huntPlaceList: HuntPlace[];
};

export function HuntSetup({ huntPlaceList }: HuntSetupProps) {
  const { control } = useFormContext<HuntSessionForm>();

  return (
    <SectionPaperCard title="Hunt Setup" icon={<BuildIcon fontSize="small" color="primary" />}>
      <Stack spacing={2} direction="column">
        <ControlledSelect
          disabled
          label="Player count"
          name="player_count"
          control={control}
          options={[{ id: 1, name: "Solo" }]}
        />

        <ControlledTextField control={control} name="level" type="number" label="Level" />

        <Controller
          name="place_id"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete<HuntPlace>
              options={huntPlaceList}
              value={huntPlaceList.find((p) => p.id === field.value) ?? null}
              onChange={(_, value) => field.onChange(value?.id ?? null)}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hunt place"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
        />
      </Stack>
    </SectionPaperCard>
  );
}
