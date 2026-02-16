"use client";

import { useState } from "react";
import type { TibiaDataCharacter } from "@/lib/tibia-data";
import { searchCharacter } from "../actions/search-character";
import { MIN_CHARACTER_NAME_LENGTH } from "../constants";

export function useCharacterSearch() {
  const [searchName, setSearchName] = useState("");
  const [foundCharacter, setFoundCharacter] = useState<TibiaDataCharacter | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (searchName.trim().length < MIN_CHARACTER_NAME_LENGTH) {
      setError(`Name must be at least ${MIN_CHARACTER_NAME_LENGTH} characters`);
      return;
    }

    setIsSearching(true);
    setError(null);
    setFoundCharacter(null);

    try {
      const result = await searchCharacter(searchName.trim());

      if (result.success && result.data) {
        setFoundCharacter(result.data);
      } else {
        setError(result.error || "Character not found");
      }
    } catch {
      setError("An unexpected error occurred while searching");
    } finally {
      setIsSearching(false);
    }
  };
  const reset = () => {
    setSearchName("");
    setFoundCharacter(null);
    setError(null);
  };

  return {
    searchName,
    setSearchName,
    foundCharacter,
    isSearching,
    error,
    search,
    reset,
    setError,
  };
}
