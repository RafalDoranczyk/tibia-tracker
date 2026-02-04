import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";

import { loadUser } from "@/modules/user";

import type { CharacterLayoutProps } from "../../types";

export default async function CharacterLayout({
  params,
  children,
}: PropsWithChildren<CharacterLayoutProps>) {
  const { characterId } = await params;
  const { characters } = await loadUser();

  const exists = characters.some((c) => c.id === characterId);

  if (!exists) {
    notFound();
  }

  return children;
}
