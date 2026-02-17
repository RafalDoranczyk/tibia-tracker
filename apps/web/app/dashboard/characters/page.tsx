import type { Metadata } from "next";
import { PageHeader } from "@/layout/page/PageHeader";
import { CharactersSyncAllButton, CharactersView } from "@/modules/characters";
import { getAppCharacters } from "@/modules/characters/server";

export const metadata: Metadata = {
  title: "Your Characters",
  description: `Manage your playable characters. Create multiple profiles, switch between them,
   and use the active character across features like bestiary, hunts, and statistics.`,
};

export default async function CharactersPage() {
  const characters = await getAppCharacters();

  const newestSync = characters.reduce((acc, char) => {
    if (!char.synchronized_at) return acc;
    const syncTime = new Date(char.synchronized_at).getTime();
    return Math.max(acc, syncTime);
  }, 0);

  return (
    <>
      <PageHeader
        title="Observe Your Characters"
        description={`Characters represent your playable profiles.
           The active character is used across all character-related features like bestiary, hunts, and statistics.`}
        action={
          <CharactersSyncAllButton
            disabled={characters.length === 0}
            lastSyncTimestamp={newestSync}
          />
        }
      />

      <CharactersView characters={characters} />
    </>
  );
}
