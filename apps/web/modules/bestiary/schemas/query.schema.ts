import { z } from "zod";

import { CharacterSchema } from "@/modules/characters";

import { BestiaryClassSchema } from "./bestiaryFilters.schema";

export const CharacterBestiaryClassQuerySchema = z.object({
  characterId: CharacterSchema.shape.id,
  bestiaryClass: BestiaryClassSchema,
});

export const CharacterBestiarySummaryQuerySchema = z.object({
  characterId: CharacterSchema.shape.id,
});
