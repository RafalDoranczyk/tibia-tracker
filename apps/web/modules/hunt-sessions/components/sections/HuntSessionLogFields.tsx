import { Paper, Stack } from "@mui/material";
import type { Control } from "react-hook-form";

import { ControlledSelect, ControlledTextField } from "@/components";
import type { HuntPlace } from "@/modules/hunt-spots";

import type { HuntSessionFormValues } from "../../schemas";

const playerOptions = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
];

type HuntSessionLogFieldsProps = {
  control: Control<HuntSessionFormValues>;
  places: HuntPlace[];
};

export function HuntSessionLogFields({ control, places }: HuntSessionLogFieldsProps) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(90deg, #1a1a1a, #292929)",
        color: "white",
      }}
    >
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <ControlledSelect
            label="Player count"
            name="player_count"
            control={control}
            options={playerOptions}
          />

          <ControlledTextField
            control={control}
            name="level"
            type="number"
            label="Level"
            fullWidth
          />

          <ControlledTextField
            control={control}
            name="minutes"
            type="number"
            label="Minutes"
            fullWidth
          />

          <ControlledTextField control={control} name="date" type="date" label="Date" />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <ControlledTextField
            control={control}
            name="balance"
            type="number"
            label="Balance"
            fullWidth
          />

          <ControlledTextField
            control={control}
            name="raw_xp_gain"
            type="number"
            label="Raw XP Gain"
            fullWidth
          />
        </Stack>

        <ControlledSelect label="Place" name="place_id" control={control} options={places} />
      </Stack>
    </Paper>
  );
}
