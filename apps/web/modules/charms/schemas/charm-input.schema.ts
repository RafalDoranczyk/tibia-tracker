import { z } from "zod";

import { CharacterSchema } from "@/modules/characters";
import { UUID } from "@/schemas";

import { CharmLevelSchema } from "./charm.schema";
import { CharmRowSchema } from "./charm-row.schema";

/* =========================================================
 * API payloads
 * ======================================================= */

export const CharacterCharmUpsertPayloadSchema = z.object({
  characterId: CharacterSchema.shape.id,
  charmId: UUID,
  level: CharmLevelSchema,
});

export const DeleteCharacterCharmPayloadSchema = z.object({
  characterId: CharacterSchema.shape.id,
  charmId: UUID,
});

/* =========================================================
 * API responses
 * ======================================================= */

export const FetchCharacterCharmsResponseSchema = z.array(
  z.object({
    id: UUID,
    character_id: CharacterSchema.shape.id,
    charm_id: UUID,
    level: CharmLevelSchema,
    unlocked_at: z.string(),
    charm: CharmRowSchema,
  })
);
