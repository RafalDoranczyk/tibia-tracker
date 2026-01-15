"use client";

import { Add, Delete } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import type { HuntSessionFormValues } from "../../schemas";

const DAMAGE_TYPES = [
  "Physical",
  "Fire",
  "Energy",
  "Earth",
  "Ice",
  "Death",
  "Holy",
  "Poison",
] as const;

export function HuntSessionDamageTypes() {
  const { control } = useFormContext<HuntSessionFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "damageTypes",
  });

  return (
    <Paper sx={{ p: 2, background: "#1f1f1f", borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" color="white" fontWeight="bold">
          💥 Damage Types
        </Typography>

        {fields.map((field, i) => (
          <Stack key={field.id} direction="row" spacing={1}>
            {/* TYPE */}
            <Controller
              name={`damageTypes.${i}.type`}
              control={control}
              render={({ field }) => (
                <TextField select label="Type" fullWidth {...field}>
                  {DAMAGE_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* PERCENT */}
            <Controller
              name={`damageTypes.${i}.percent`}
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
          <IconButton color="primary" onClick={() => append({ type: "", percent: 0 })}>
            <Add />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}
