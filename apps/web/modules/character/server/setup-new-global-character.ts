import type { TypedSupabaseClient } from "@repo/database";
import { ExperienceLogRepo } from "@repo/database/experience-log";
import {
  GlobalCharactersRepo,
  type SetupNewCharacterPayload,
} from "@repo/database/global-characters";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { ExpHistoryScraper } from "@repo/scrapers";

export type SetupNewGlobalCharacterProps = {
  supabase: TypedSupabaseClient;
  character: Omit<SetupNewCharacterPayload, "id" | "userId"> & { globalCharacterId: string };
};

export async function setupNewGlobalCharacter({
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

    const { history, bestDay } = await scraper.scrapeFull(character.name);

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
      if (insertError) throw insertError;
    }

    await GlobalCharactersRepo.completeSync(supabase, {
      id: character.globalCharacterId,
      name: character.name,
      world: character.world,
      vocation: character.vocation,
      peak_level: bestDay?.level ?? null,
      peak_experience: bestDay?.experience ?? null,
      peak_recorded_at: bestDay ? new Date(bestDay.date).toISOString() : null,
    });

    return records.length;
  } catch (error) {
    await GlobalCharactersRepo.updateSyncStatus(supabase, {
      id: character.globalCharacterId,
      status: "error",
    });
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, `Full sync failed: ${character.name}`);
  }
}
