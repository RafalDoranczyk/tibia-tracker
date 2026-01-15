import { Add, Delete } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";

import type { HuntSessionFormValues, SupplyItem } from "../../schemas";

type HuntSessionSuppliesProps = {
  suppliesList: SupplyItem[];
};

export function HuntSessionSupplies({ suppliesList }: HuntSessionSuppliesProps) {
  const { control } = useFormContext<HuntSessionFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "supplies",
  });

  const supplies =
    useWatch({
      control,
      name: "supplies",
    }) ?? [];

  const getAvailableSupplies = useCallback(
    (currentIndex: number) => {
      const selectedIds = supplies
        .map((s, i) => (i !== currentIndex ? s?.item : null))
        .filter(Boolean);

      return suppliesList.filter(
        (opt) => !selectedIds.includes(opt.id) || opt.id === supplies[currentIndex]?.item
      );
    },
    [supplies, suppliesList]
  );

  const canAdd = supplies.length === 0 || supplies.at(-1)?.item;

  return (
    <Paper sx={{ p: 2, background: "#1f1f1f", borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" color="white" fontWeight="bold">
          🧪 Supplies Used
        </Typography>

        {fields.map((field, i) => (
          <Stack key={field.id} direction="row" alignItems="center" spacing={1}>
            {/* ITEM */}
            <Controller
              name={`supplies.${i}.item`}
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    },
                  }}
                  select
                  label="Item"
                  fullWidth
                  {...field}
                >
                  {getAvailableSupplies(i).map((opt) => (
                    <MenuItem key={opt.id} value={opt.id}>
                      <Avatar
                        src={opt.image_url}
                        alt={opt.name}
                        sx={{ width: 24, height: 24, mr: 1 }}
                        variant="rounded"
                      />
                      <ListItemText primary={opt.name} />
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* AMOUNT */}
            <Controller
              name={`supplies.${i}.amount`}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Amount" type="number" sx={{ width: 120 }} />
              )}
            />

            {/* REMOVE */}
            <IconButton color="error" onClick={() => remove(i)}>
              <Delete />
            </IconButton>
          </Stack>
        ))}

        {/* ADD */}
        <div>
          <IconButton
            color="primary"
            disabled={!canAdd}
            onClick={() => append({ item: 0, amount: 1 })}
          >
            <Add />
          </IconButton>
        </div>
      </Stack>
    </Paper>
  );
}
