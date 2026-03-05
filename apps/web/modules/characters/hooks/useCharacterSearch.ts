"use client";

import type { TibiaDataCharacter } from "@repo/tibia-data";
import { useState } from "react";
import { searchCharacterByName } from "../actions/search-character-by-name";

export function useCharacterSearch() {
  const [searchName, setSearchName] = useState("");
  const [foundCharacter, setFoundCharacter] = useState<TibiaDataCharacter | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (e?: React.SubmitEvent) => {
    e?.preventDefault();

    setIsSearching(true);
    setError(null);
    setFoundCharacter(null);

    try {
      const result = await searchCharacterByName(searchName.trim());

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
