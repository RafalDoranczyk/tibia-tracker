"use client";

import BuildIcon from "@mui/icons-material/Build";
import { Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { ControlledSelect, ControlledTextField } from "@/components";
import type { HuntPlace } from "@/modules/hunt-places";

import { HUNT_SESSION_PLAYER_OPTIONS } from "../../constants";
import type { HuntSessionForm } from "../../types";

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

      <ControlledSelect
        label="Hunt Place"
        name="place_id"
        control={control}
        options={huntPlaceList}
      />
    </Stack>
  );
}
