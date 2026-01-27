import type { z } from "zod";

import type {
  CharacterCharmRowSchema,
  CharacterCharmRowWithCharmSchema,
  CharacterCharmUpsertPayloadSchema,
  CharmEconomySchema,
  CharmLevelSchema,
  CharmProgressSchema,
  CharmRowSchema,
  CharmSchema,
  CharmTypeSchema,
  CharmWithProgressSchema,
  DeleteCharacterCharmPayloadSchema,
} from "./schemas";

/* =========================================================
 * Shared
 * ======================================================= */
export type CharmType = z.infer<typeof CharmTypeSchema>;
export type CharmLevel = z.infer<typeof CharmLevelSchema>;

/* =========================================================
 * Domain
 * ======================================================= */
export type CharmEconomy = z.infer<typeof CharmEconomySchema>;
export type Charm = z.infer<typeof CharmSchema>;
export type CharmProgress = z.infer<typeof CharmProgressSchema>;
export type CharmWithProgress = z.infer<typeof CharmWithProgressSchema>;

/* =========================================================
 * DB
 * ======================================================= */

export type CharmRow = z.infer<typeof CharmRowSchema>;
export type CharacterCharmRow = z.infer<typeof CharacterCharmRowSchema>;
export type CharacterCharmRowWithCharm = z.infer<typeof CharacterCharmRowWithCharmSchema>;

/* =========================================================
 * API
 * ======================================================= */

export type CharacterCharmUpsertPayload = z.infer<typeof CharacterCharmUpsertPayloadSchema>;
export type DeleteCharacterCharmPayload = z.infer<typeof DeleteCharacterCharmPayloadSchema>;
