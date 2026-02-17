"use client";

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import type { AppCharacter } from "../schemas";

type CharactersContextValue = {
  characters: AppCharacter[];
  setCharacters: Dispatch<SetStateAction<AppCharacter[]>>;
};

const CharactersContext = createContext<CharactersContextValue | null>(null);

export function CharactersProvider({
  initialCharacters,
  children,
}: PropsWithChildren<{ initialCharacters: AppCharacter[] }>) {
  const [characters, setCharacters] = useState(initialCharacters);

  useEffect(() => {
    setCharacters(initialCharacters);
  }, [initialCharacters]);

  return (
    <CharactersContext.Provider value={{ characters, setCharacters }}>
      {children}
    </CharactersContext.Provider>
  );
}

export function useCharacters() {
  const ctx = useContext(CharactersContext);
  if (!ctx) throw new Error("useCharacters must be used within CharactersProvider");
  return ctx;
}
