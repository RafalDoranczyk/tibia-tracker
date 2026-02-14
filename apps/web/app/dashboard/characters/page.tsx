import type { Metadata } from "next";

import { PageHeader } from "@/layout/page/PageHeader";
import { CharactersView } from "@/modules/characters";
import { getCharacterList } from "@/modules/characters/server";

export const metadata: Metadata = {
  title: "Your Characters",
  description: `Manage your playable characters. Create multiple profiles, switch between them,
   and use the active character across features like bestiary, hunts, and statistics.`,
};

export default async function CharactersPage() {
  const characters = await getCharacterList();

  return (
    <>
      <PageHeader
        title="Your Characters"
        description={`Characters represent your playable profiles. You can create multiple characters and switch between them at any time.
           The active character is used across all character-related features like bestiary, hunts, and statistics.`}
      />

      <CharactersView characters={characters} hasCharacters={characters.length > 0} />
    </>
  );
}
