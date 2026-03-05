import type { Metadata } from "next";
import { PageHeader } from "@/layout/page/PageHeader";
import { CharactersView } from "@/modules/characters";
import { loadAppCharacters } from "@/modules/characters/server";

export const metadata: Metadata = {
  title: "Your Characters",
  description: `Manage your playable characters. Create multiple profiles, switch between them,
   and use the active character across features like bestiary, hunts, and statistics.`,
};

export default async function CharactersPage() {
  const characters = await loadAppCharacters();

  return (
    <>
      <PageHeader
        title="Observe Your Characters"
        description={`Characters represent your playable profiles.
           The active character is used across all character-related features like bestiary, hunts, and statistics.`}
      />

      <CharactersView characters={characters} />
    </>
  );
}
