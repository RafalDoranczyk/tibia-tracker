import { z } from "zod";

import { BestiaryClassSchema } from "./bestiaryFilters.schema";

export const CharacterBestiaryClassQuerySchema = z.object({
  characterId: z.string(),
  bestiaryClass: BestiaryClassSchema,
});

export const CharacterBestiarySummaryQuerySchema = z.object({
  characterId: z.string(),
});
