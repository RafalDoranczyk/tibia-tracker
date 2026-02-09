import { z } from "zod";

import { CharacterIDSchema } from "@/modules/characters";

import { BestiaryClassSchema } from "./monster.schema";

export const CharacterBestiaryClassRequestSchema = z.object({
  characterId: CharacterIDSchema,
  bestiaryClass: BestiaryClassSchema,
});

export const CharacterBestiarySummaryRequestSchema = z.object({
  characterId: CharacterIDSchema,
});
