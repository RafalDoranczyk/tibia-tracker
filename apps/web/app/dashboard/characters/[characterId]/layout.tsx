import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";

import { fetchCharacters } from "@/modules/characters/server";

import type { CharacterLayoutProps } from "../../types";

export default async function CharacterLayout({
  params,
  children,
}: PropsWithChildren<CharacterLayoutProps>) {
  const { characterId } = await params;
  const characters = await fetchCharacters();

  const exists = characters.some(({ id }) => id === characterId);

  if (!exists) {
    notFound();
  }

  return children;
}
