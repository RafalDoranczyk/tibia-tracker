"use client";

import { useCallback, useEffect, useRef } from "react";

import { SearchFieldURL } from "@/components";

type DebouncedSearchFieldURLProps = {
  value?: string;
  onChange: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
};

export function DebouncedSearchFieldURL({
  value = "",
  onChange,
  debounceMs = 500,
  placeholder,
}: DebouncedSearchFieldURLProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (inputValue: string) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new debounced timeout
      timeoutRef.current = setTimeout(() => {
        onChange(inputValue);
      }, debounceMs);
    },
    [onChange, debounceMs]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <SearchFieldURL value={value} onChange={handleChange} placeholder={placeholder} />;
}
