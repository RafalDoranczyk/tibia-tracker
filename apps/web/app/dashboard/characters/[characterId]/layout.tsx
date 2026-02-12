import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";

import { loadCharacters } from "@/modules/characters";

import type { CharacterLayoutProps } from "../../types";

export default async function CharacterLayout({
  params,
  children,
}: PropsWithChildren<CharacterLayoutProps>) {
  const { characterId } = await params;
  const characters = await loadCharacters();

  const exists = characters.some(({ id }) => id === characterId);

  if (!exists) {
    notFound();
  }

  return children;
}
