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

const CharactersContextType = createContext<CharactersContextValue | null>(null);

export function CharactersContext({
  initialCharacters,
  children,
}: PropsWithChildren<{ initialCharacters: AppCharacter[] }>) {
  const [characters, setCharacters] = useState(initialCharacters);

  useEffect(() => {
    setCharacters(initialCharacters);
  }, [initialCharacters]);

  return (
    <CharactersContextType.Provider value={{ characters, setCharacters }}>
      {children}
    </CharactersContextType.Provider>
  );
}

export function useCharacters() {
  const ctx = useContext(CharactersContextType);
  if (!ctx) throw new Error("useCharacters must be used within CharactersContext");
  return ctx;
}
