"use client";

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useState,
} from "react";

import type { Character } from "../schemas";

type CharactersContextValue = {
  characters: Character[];
  setCharacters: Dispatch<SetStateAction<Character[]>>;
};

const CharactersContext = createContext<CharactersContextValue | null>(null);

export function CharactersProvider({
  initialCharacters,
  children,
}: PropsWithChildren<{ initialCharacters: Character[] }>) {
  const [characters, setCharacters] = useState(initialCharacters);

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
