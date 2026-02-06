"use client";

import BuildIcon from "@mui/icons-material/Build";
import { Autocomplete, Divider, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { ControlledSelect, ControlledTextField } from "@/components";
import type { HuntPlace } from "@/modules/hunt-places";

import { HUNT_SESSION_PLAYER_OPTIONS } from "../../../constants";
import type { HuntSessionForm } from "../../../schemas";

type HuntSetupProps = {
  huntPlaceList: HuntPlace[];
};

export function HuntSetup({ huntPlaceList }: HuntSetupProps) {
  const { control } = useFormContext<HuntSessionForm>();

  return (
    <Stack spacing={2} direction="column">
      <Stack direction="row" alignItems="center" spacing={2}>
        <BuildIcon fontSize="small" color="primary" />
        <Typography fontWeight={700}>Hunt Setup</Typography>
      </Stack>

      <Divider />

      <ControlledSelect
        disabled
        label="Player count"
        name="player_count"
        control={control}
        options={HUNT_SESSION_PLAYER_OPTIONS}
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
  );
}
