"use client";

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type * as React from "react";

type MultiSelectOption = {
  id: string;
  name: string;
};

type MultiSelectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  options: MultiSelectOption[];
  disabled?: boolean;
  sx?: SxProps<Theme>;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ALL_OPTION_ID = "__ALL__";

export function MultiSelect({ value, onChange, label, options, sx, disabled }: MultiSelectProps) {
  const allSelected = value.length === options.length;
  const isAllSelected = allSelected;

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string[]; name?: string } }),
    _child?: React.ReactNode
  ) => {
    const selected = event.target.value as string[];

    if (selected.includes(ALL_OPTION_ID)) {
      if (isAllSelected) {
        onChange([]);
      } else {
        onChange(options.map((option) => option.id));
      }
      return;
    }

    onChange(selected);
  };

  const renderValue = (selected: string[]) => {
    if (selected.length === 0) return "None";
    if (selected.length === options.length) return "All";
    return options
      .filter((option) => selected.includes(option.id))
      .map((option) => option.name)
      .join(", ");
  };

  return (
    <FormControl sx={sx} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        disabled={disabled}
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={renderValue}
        MenuProps={MenuProps}
      >
        <MenuItem value={ALL_OPTION_ID}>
          <Checkbox checked={isAllSelected} indeterminate={value.length > 0 && !allSelected} />
          <ListItemText primary="All" />
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={value.includes(option.id)} />
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
