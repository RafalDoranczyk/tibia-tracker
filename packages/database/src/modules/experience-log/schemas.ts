import { NonEmptyString, PositiveInt, z } from "@repo/validation";
import type { Enums, Tables } from "../../types/db";

const ScraperSourceEnum = z.enum(["official", "guildstats", "manual"]) satisfies z.ZodType<
  Enums<"scraper_source">
>;

export const CharacterExpHistorySchema = z.object({
  id: z.uuid(),
  character_name: NonEmptyString,
  level: PositiveInt,
  experience: PositiveInt,
  rank: PositiveInt,
  recorded_at: NonEmptyString,
  source: ScraperSourceEnum,
  created_at: NonEmptyString,
  global_character_id: z.string().nullable(),
}) satisfies z.ZodType<Tables<"experience_log">>;
export type CharacterExpHistory = z.infer<typeof CharacterExpHistorySchema>;
