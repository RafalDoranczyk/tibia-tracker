import type { z } from "zod";

import type {
  CreateHuntSessionPayloadSchema,
  DamageElementCountSchema,
  DamageElementSchema,
  DeleteHuntSessionPayloadSchema,
  FetchHuntSessionsListPayloadSchema,
  FetchHuntSessionsListResponseSchema,
  HuntSessionDamageSourceSchema,
  HuntSessionDbFieldsSchema,
  HuntSessionFormSchema,
  HuntSessionListItemSchema,
  HuntSessionRawParsedSchema,
  HuntSessionSchema,
  ItemPreviewSchema,
  LootedItemCountSchema,
  MonsterCountSchema,
  MonsterPreviewSchema,
  SupplyCountSchema,
  SupplyItemSchema,
  UpdateHuntSessionPayloadSchema,
} from "./schemas";

/* ==========================================================================
   1. DICTIONARY TYPES
   ========================================================================== */

export type SupplyItem = z.infer<typeof SupplyItemSchema>;
export type DamageElement = z.infer<typeof DamageElementSchema>;
export type MonsterPreview = z.infer<typeof MonsterPreviewSchema>;
export type ItemPreview = z.infer<typeof ItemPreviewSchema>;

/* ==========================================================================
   2. RELATION / COUNT TYPES
   ========================================================================== */

export type MonsterCount = z.infer<typeof MonsterCountSchema>;
export type LootedItemCount = z.infer<typeof LootedItemCountSchema>;
export type SupplyCount = z.infer<typeof SupplyCountSchema>;
export type DamageElementCount = z.infer<typeof DamageElementCountSchema>;
export type HuntSessionDamageSource = z.infer<typeof HuntSessionDamageSourceSchema>;

/* ==========================================================================
   3. MAIN DOMAIN TYPES
   ========================================================================== */

export type HuntSession = z.infer<typeof HuntSessionSchema>;
export type HuntSessionListItem = z.infer<typeof HuntSessionListItemSchema>;
export type HuntSessionDbFields = z.infer<typeof HuntSessionDbFieldsSchema>;

/* ==========================================================================
   4. API & FORM TYPES
   ========================================================================== */

export type FetchHuntSessionsListPayload = z.infer<typeof FetchHuntSessionsListPayloadSchema>;
export type FetchHuntSessionsListResponse = z.infer<typeof FetchHuntSessionsListResponseSchema>;

export type CreateHuntSessionPayload = z.input<typeof CreateHuntSessionPayloadSchema>;
export type UpdateHuntSessionPayload = z.infer<typeof UpdateHuntSessionPayloadSchema>;
export type DeleteHuntSessionPayload = z.infer<typeof DeleteHuntSessionPayloadSchema>;
export type HuntSessionFormValues = z.infer<typeof HuntSessionFormSchema>;

/* ==========================================================================
   5. INTERNAL / PARSER TYPES
   ========================================================================== */

export type HuntSessionRawParsed = z.infer<typeof HuntSessionRawParsedSchema>;

export type HuntSessionUnknownEntity = {
  name: string;
  count: number;
};

export type HuntSessionUnknownEntities = {
  items: HuntSessionUnknownEntity[];
  monsters: HuntSessionUnknownEntity[];
} | null;
