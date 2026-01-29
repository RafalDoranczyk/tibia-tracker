import { z } from "zod";

import { CharacterSchema } from "@/modules/characters";
import { zodOmitKeys } from "@/utils";

import { HuntSessionDbFieldsComputedSchema, HuntSessionDbFieldsSchema } from "./db.schema";
import { HuntSessionListItemSchema } from "./list.schema";
import {
  DamageElementCountSchema,
  HuntSessionDamageSourceSchema,
  LootedItemCountSchema,
  MonsterCountSchema,
  SupplyCountSchema,
} from "./relations.schema";

export const HuntSessionPayloadBaseSchema = HuntSessionDbFieldsSchema.omit({
  id: true,
  created_at: true,
  ...zodOmitKeys(HuntSessionDbFieldsComputedSchema),
}).extend({
  monsters: MonsterCountSchema.array(),
  items: LootedItemCountSchema.array(),

  // OPTIONAL
  supplies: SupplyCountSchema.array().optional(),
  damage_elements: DamageElementCountSchema.array().optional(),
  damage_sources: HuntSessionDamageSourceSchema.array().optional(),
});

export const FetchHuntSessionsListPayloadSchema = z.object({
  character_id: CharacterSchema.shape.id,
  limit: z.number().min(1).optional(),
  offset: z.number().min(0).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  orderBy: z.enum(["date", "level", "duration_seconds", "raw_xp_gain", "profit"]).optional(),
});

export const FetchHuntSessionsListResponseSchema = z.object({
  count: z.number(),
  data: z.array(HuntSessionListItemSchema),
});

export const CreateHuntSessionPayloadSchema = HuntSessionPayloadBaseSchema;

export const UpdateHuntSessionPayloadSchema = HuntSessionPayloadBaseSchema.extend({
  id: z.number(),
});

export const DeleteHuntSessionPayloadSchema = z.object({
  id: z.number(),
});
