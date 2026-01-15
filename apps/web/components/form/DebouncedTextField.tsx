"use client";

import { TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

type DebouncedTextFieldProps = {
  value: number;
  onChange: (value: number) => void;
  debounceMs?: number;
  label?: string;
};

export function DebouncedTextField({
  value,
  onChange,
  debounceMs = 400,
  label,
}: DebouncedTextFieldProps) {
  const [internalValue, setInternalValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (raw: string) => {
      const next = Number(raw) || 0;
      setInternalValue(next);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        onChange(next);
      }, debounceMs);
    },
    [onChange, debounceMs]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <TextField
      sx={{ alignSelf: "flex-end", width: 200 }}
      type="number"
      label={label}
      value={internalValue}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
