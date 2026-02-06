import { z } from "zod";

import { CharacterIDSchema } from "@/modules/characters";

import { BestiaryClassSchema } from "./bestiaryFilters.schema";

export const CharacterBestiaryClassQuerySchema = z.object({
  characterId: CharacterIDSchema,
  bestiaryClass: BestiaryClassSchema,
});

export const CharacterBestiarySummaryQuerySchema = z.object({
  characterId: CharacterIDSchema,
});
