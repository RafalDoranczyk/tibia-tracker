import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import { fetchCharacters } from "@/modules/characters";

import type { CharacterPageProps } from "../../types";

export const metadata: Metadata = {
  title: "Your Character",
  description: "View and manage your character details.",
};

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { characterId } = await params;
  const a = await fetchCharacters();

  const character = a.find((el) => el.id === characterId);

  return (
    <>
      <PageHeader
        title="Your Character"
        description={`Details for character ${character?.name || ""}`}
      />
    </>
  );
}
