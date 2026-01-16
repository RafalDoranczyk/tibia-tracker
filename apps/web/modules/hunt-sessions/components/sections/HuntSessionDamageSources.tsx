import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { Box, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import type { HuntSessionFormValues } from "../../schemas";

export function HuntSessionDamageSources() {
  const { control } = useFormContext<HuntSessionFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "damageSources",
  });

  return (
    <Paper sx={{ p: 2, background: "#1f1f1f", borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" color="white" fontWeight="bold">
          🧨 Damage Sources
        </Typography>

        {fields.map((field, i) => (
          <Stack key={field.id} direction="row" spacing={1}>
            {/* MONSTER */}
            <Controller
              name={`damageSources.${i}.monster`}
              control={control}
              render={({ field }) => <TextField {...field} label="Monster" fullWidth />}
            />

            {/* PERCENT */}
            <Controller
              name={`damageSources.${i}.percent`}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="% Damage" type="number" sx={{ width: 140 }} />
              )}
            />

            {/* REMOVE */}
            <IconButton color="error" onClick={() => remove(i)}>
              <Delete />
            </IconButton>
          </Stack>
        ))}

        {/* ADD */}
        <Box>
          <IconButton color="primary" onClick={() => append({ monster: "", percent: 0 })}>
            <Add />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}
