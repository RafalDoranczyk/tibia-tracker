"use server";

import { GuildStatsExpHistoryScraper } from "@repo/scrapers";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { CharacterSchema } from "@/modules/characters/schemas";
import { dbInsertCharacterExperienceLog } from "../server/mutations/character-log-history";
import { dbGetCharacterLastEntry } from "../server/queries/get-character-exp-history";

export async function insertCharacterExpHistory(payload: unknown) {
  const character = assertZodParse(CharacterSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();
  const scraper = new GuildStatsExpHistoryScraper();

  // 1. Fetch full history from scraper
  const history = await scraper.scrape(character.name);

  // 2. Find the date of the last entry in your database for this character
  const { data: lastEntry } = await dbGetCharacterLastEntry(supabase, character.name);

  const lastDate = lastEntry ? new Date(lastEntry.recorded_at) : new Date(0);

  // 3. Filter only new records
  const newRecords = history
    .filter((entry) => new Date(entry.date) > lastDate)
    .map(({ level, experience, date, rank }) => ({
      character_name: character.name,
      world: character.world,
      level,
      experience,
      recorded_at: new Date(date).toISOString(),
      source: "guildstats" as const,
      vocation: character.vocation,
      rank,
    }));

  if (newRecords.length === 0) return { success: true, count: 0 };

  const { error } = await dbInsertCharacterExperienceLog(supabase, newRecords);

  if (error) {
    throwAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to import experience history for character"
    );
  }

  return { success: !error, count: newRecords.length };
}
