"use client";

import { Autocomplete as MaterialAutocomplete, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";

type AutocompleteOptionBase = {
  id: number | string;
  name: string;
};

type AutocompleteProps<T extends AutocompleteOptionBase> = {
  disabled?: boolean;
  isLoading: boolean;
  label: string;
  options: T[];

  onChange: (element: T) => void;
  renderOption?: (option: T) => React.ReactNode;
};

export function Autocomplete<T extends AutocompleteOptionBase>({
  disabled = false,
  isLoading,
  label,
  onChange,
  options,
  renderOption,
}: AutocompleteProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <MaterialAutocomplete
      // Need it to auto clear text inside field
      key={options.length}
      clearOnBlur
      clearOnEscape
      disabled={disabled}
      fullWidth
      getOptionLabel={({ name }) => name}
      isOptionEqualToValue={({ name }, value) => name === value.name}
      loadingText="Loading..."
      noOptionsText={isLoading ? "Loading..." : "No results"}
      onChange={(_, element) => {
        if (element) {
          onChange(element);
        }
        setOpen(false);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      open={open}
      options={options}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {renderOption ? renderOption(option) : option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
