import type { z } from "zod";

import type {
  CreateHuntSessionPayloadSchema,
  DamageElementSchema,
  DamageSourceSchema,
  DeleteHuntSessionPayloadSchema,
  FetchHuntSessionListPayloadSchema,
  FetchHuntSessionListResponseSchema,
  FetchHuntSessionPayloadSchema,
  HuntSessionDbFieldsSchema,
  HuntSessionFormSchema,
  HuntSessionListItemSchema,
  HuntSessionLogParsedSchema,
  HuntSessionSchema,
  ItemPreviewSchema,
  MonsterPreviewSchema,
  PreyBonusSchema,
  UpdateHuntSessionPayloadSchema,
} from "./schemas";

/* ==========================================================================
   1. DICTIONARY TYPES
   ========================================================================== */
export type MonsterPreview = z.infer<typeof MonsterPreviewSchema>;
export type ItemPreview = z.infer<typeof ItemPreviewSchema>;
export type DamageElement = z.infer<typeof DamageElementSchema>;
export type DamageSource = z.infer<typeof DamageSourceSchema>;
export type PreyBonus = z.infer<typeof PreyBonusSchema>;

/* ==========================================================================
   2. MAIN DOMAIN TYPES
   ========================================================================== */
export type HuntSession = z.infer<typeof HuntSessionSchema>;
export type HuntSessionListItem = z.infer<typeof HuntSessionListItemSchema>;
export type HuntSessionDbFields = z.infer<typeof HuntSessionDbFieldsSchema>;

/* ==========================================================================
   3. API
   ========================================================================== */
export type FetchHuntSessionPayload = z.infer<typeof FetchHuntSessionPayloadSchema>;
export type FetchHuntSessionListPayload = z.infer<typeof FetchHuntSessionListPayloadSchema>;
export type FetchHuntSessionListResponse = z.infer<typeof FetchHuntSessionListResponseSchema>;
export type CreateHuntSessionPayload = z.input<typeof CreateHuntSessionPayloadSchema>;
export type UpdateHuntSessionPayload = z.infer<typeof UpdateHuntSessionPayloadSchema>;
export type DeleteHuntSessionPayload = z.infer<typeof DeleteHuntSessionPayloadSchema>;

/* ==========================================================================
   4. INTERNAL FORM VALUES / PARSER TYPES
   ========================================================================== */
export type HuntSessionForm = z.infer<typeof HuntSessionFormSchema>;
export type HuntSessionRawParsed = z.infer<typeof HuntSessionLogParsedSchema>;

export type HuntSessionUnknownEntities = {
  items: string[];
  monsters: string[];
} | null;
