import {
  type CharacterVocation,
  dbCompleteSync,
  dbGetCharacterLastEntry,
  dbInsertCharacterExperienceLog,
  dbUpdateSyncStatus,
  type TypedSupabaseClient,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { GuildStatsExpHistoryScraper } from "@repo/scrapers";
import { isCharacterSyncAllowed } from "../utils/isCharacterSyncAllowed";

type SyncPayload = {
  globalCharacterId: string;
  name: string;
  world: string;
  vocation: CharacterVocation;
};

type ExecuteHistorySyncPayload = {
  supabase: TypedSupabaseClient;
  character: SyncPayload;
};

export async function executeHistorySync({ supabase, character }: ExecuteHistorySyncPayload) {
  try {
    const { data: lastEntry } = await dbGetCharacterLastEntry({
      supabase,
      globalCharacterId: character.globalCharacterId,
    });

    const lastDate = lastEntry ? new Date(lastEntry.recorded_at) : null;

    if (!isCharacterSyncAllowed(lastDate)) {
      console.log(
        `[Sync] Skipping ${character.name} - Data is already up to date or update not yet available.`
      );

      return { count: 0, success: true, skipped: true };
    }

    // Start synchronization process
    await dbUpdateSyncStatus({
      supabase,
      globalCharacterId: character.globalCharacterId,
      status: "pending",
    });

    const scraper = new GuildStatsExpHistoryScraper();
    const history = await scraper.scrape(character.name);

    const lastDateTime = lastDate ? lastDate.getTime() : 0;
    const records = history
      .filter((entry) => new Date(entry.date).getTime() > lastDateTime)
      .map((entry) => ({
        global_character_id: character.globalCharacterId,
        character_name: character.name,
        level: entry.level,
        experience: entry.experience,
        recorded_at: new Date(entry.date).toISOString(),
        source: "guildstats" as const,
        rank: entry.rank,
        world: character.world,
        vocation: character.vocation,
      }));

    if (records.length > 0) {
      const { error: insertError } = await dbInsertCharacterExperienceLog({ supabase, records });
      if (insertError) throw insertError;
    }

    await dbCompleteSync({
      supabase,
      character: {
        id: character.globalCharacterId,
        world: character.world,
        vocation: character.vocation,
      },
    });

    return { count: records.length, success: true };
  } catch (error) {
    await dbUpdateSyncStatus({
      supabase,
      globalCharacterId: character.globalCharacterId,
      status: "error",
    });
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, `Sync failed for: ${character.name}`);
  }
}
