import type { z } from "zod";

import type { BESTIARY_CLASSES } from "./constants";
import type {
  CharacterBestiaryClassSummarySchema,
  CharacterBestiaryEntrySchema,
  CharacterBestiarySchema,
  CharacterBestiarySummarySchema,
  MonsterSchema,
  MonsterWithCharacterProgressSchema,
  UpdateCharacterBestiaryEntrySchema,
} from "./schemas";

export type BestiaryClass = (typeof BESTIARY_CLASSES)[number];
export type Monster = z.infer<typeof MonsterSchema>;
export type CharacterBestiary = z.infer<typeof CharacterBestiarySchema>;

export type CharacterBestiaryEntry = z.infer<typeof CharacterBestiaryEntrySchema>;
export type UpdateCharacterBestiaryEntry = z.infer<typeof UpdateCharacterBestiaryEntrySchema>;
export type MonsterWithCharacterProgress = z.infer<typeof MonsterWithCharacterProgressSchema>;

export type CharacterBestiarySummary = z.infer<typeof CharacterBestiarySummarySchema>;
export type CharacterBestiaryClassSummary = z.infer<typeof CharacterBestiaryClassSummarySchema>;
export type CharacterBestiaryFullResponse = {
  monsters: MonsterWithCharacterProgress[];
  totalCount: number;
  totalPages: number;
};
