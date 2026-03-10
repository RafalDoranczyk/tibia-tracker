import { ExperienceLogRepo } from "@repo/database/experience-log";
import { GlobalCharactersRepo } from "@repo/database/global-characters";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { ExpHistoryScraper } from "@repo/scrapers";
import type { SetupNewGlobalCharacterProps } from "./setup-new-global-character";

export async function syncExistingGlobalCharacter({
  supabase,
  character,
}: SetupNewGlobalCharacterProps) {
  try {
    const { globalCharacterId, name, world, vocation } = character;

    const [{ data: lastEntry }] = await Promise.all([
      ExperienceLogRepo.getLastEntry(supabase, globalCharacterId),
      GlobalCharactersRepo.updateSyncStatus(supabase, { id: globalCharacterId, status: "pending" }),
    ]);

    const scraper = new ExpHistoryScraper();
    const history = await scraper.scrapeHistory(name);

    const lastDateTime = lastEntry ? new Date(lastEntry.recorded_at).getTime() : 0;

    const records = history
      .filter((entry) => new Date(entry.date).getTime() > lastDateTime)
      .map((entry) => ({
        global_character_id: globalCharacterId,
        character_name: name,
        level: entry.level,
        experience: entry.experience,
        recorded_at: new Date(entry.date).toISOString(),
        source: "guildstats" as const,
        rank: entry.rank,
        world,
        vocation,
      }));

    if (records.length > 0) {
      const { error: insertError } = await ExperienceLogRepo.upsertBatch(supabase, records);
      throwAndLogError(
        insertError,
        AppErrorCode.SERVER_ERROR,
        `Records batch failed for: ${character.name}`
      );
    }

    return records.length;
  } catch (error) {
    console.error(`[Worker] Sync failed for ${character.name}:`, error);
    await GlobalCharactersRepo.updateSyncStatus(supabase, {
      id: character.globalCharacterId,
      status: "error",
    });
    return 0;
  }
}
