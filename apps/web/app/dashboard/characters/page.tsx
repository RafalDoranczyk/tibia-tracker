import type { Metadata } from "next";
import { PageHeader } from "@/layout/page/PageHeader";
import {
  CharacterHistorySyncAllButton,
  CharactersSyncAllButton,
  CharactersView,
} from "@/modules/characters";
import { getAppCharacters, getLatestExpLogDate } from "@/modules/characters/server";

export const metadata: Metadata = {
  title: "Your Characters",
  description: `Manage your playable characters. Create multiple profiles, switch between them,
   and use the active character across features like bestiary, hunts, and statistics.`,
};

export default async function CharactersPage() {
  const characters = await getAppCharacters();

  const newestLiveSync = characters.reduce((acc, char) => {
    if (!char.synchronized_at) return acc;
    const syncTime = new Date(char.synchronized_at).getTime();
    return Math.max(acc, syncTime);
  }, 0);

  const newestHistorySync = await getLatestExpLogDate();

  return (
    <>
      <PageHeader
        title="Observe Your Characters"
        description={`Characters represent your playable profiles.
           The active character is used across all character-related features like bestiary, hunts, and statistics.`}
        action={
          <div className="flex gap-2">
            {/*  LIVE DATA (TibiaData) */}
            <CharactersSyncAllButton
              disabled={characters.length === 0}
              lastSyncTimestamp={newestLiveSync}
            />
            {/*  HISTORY DATA (GuildStats) */}
            <CharacterHistorySyncAllButton
              disabled={characters.length === 0}
              lastSyncTimestamp={newestHistorySync}
            />
          </div>
        }
      />

      <CharactersView characters={characters} />
    </>
  );
}
