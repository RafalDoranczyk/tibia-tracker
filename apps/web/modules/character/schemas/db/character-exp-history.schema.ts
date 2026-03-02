import type { Enums, Tables } from "@repo/database";
import { z } from "zod";
import { NonEmptyString, PositiveInt } from "@/lib/zod";
import { CharacterVocationSchema } from "@/modules/characters";

const ScraperSourceEnum = z.enum(["official", "guildstats", "manual"]) satisfies z.ZodType<
  Enums<"scraper_source">
>;

export const CharacterExpHistorySchema = z.object({
  id: z.uuid(),
  character_name: NonEmptyString,
  world: NonEmptyString,
  level: PositiveInt,
  experience: PositiveInt,
  rank: PositiveInt,
  vocation: CharacterVocationSchema,
  recorded_at: NonEmptyString,
  source: ScraperSourceEnum,
  created_at: NonEmptyString,
}) satisfies z.ZodType<Tables<"experience_log">>;

export type CharacterExpHistory = z.infer<typeof CharacterExpHistorySchema>;

export type CreateCharacterExpHistoryInput = Omit<CharacterExpHistory, "id" | "created_at">;

export const FetchCharacterExpHistorySchema = CharacterExpHistorySchema.pick({
  id: true,
  character_name: true,
  level: true,
  experience: true,
  rank: true,
  recorded_at: true,
});
