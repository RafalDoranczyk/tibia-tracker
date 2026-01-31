import { z } from "zod";

import { MonsterSchema } from "@/modules/bestiary";
import { CharacterSchema } from "@/modules/characters";
import { ItemSchema } from "@/modules/items";
import { PositiveNumber, PositiveNumberNonZero } from "@/schemas";

import { DamageElementSchema, DamageSourceSchema, PreyBonusSchema } from "./catalog.schema";
import {
  HuntSessionDbBaseFieldsSchema,
  HuntSessionListItemSchema,
  HuntSessionSchema,
} from "./db.schema";

export const FetchHuntSessionPayloadSchema = z.object({
  id: HuntSessionSchema.shape.id,
  character_id: CharacterSchema.shape.id,
});

export const FetchHuntSessionListPayloadSchema = z.object({
  character_id: CharacterSchema.shape.id,
  limit: z.number().min(1).optional(),
  offset: z.number().min(0).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  orderBy: z.enum(["date"]).optional(),
});

export const FetchHuntSessionListResponseSchema = z.object({
  count: PositiveNumber,
  data: z.array(HuntSessionListItemSchema),
});

export const CreateHuntSessionPayloadSchema = HuntSessionDbBaseFieldsSchema.omit({
  id: true,
}).extend({
  killed_monsters: z.array(
    z.object({
      monster_id: MonsterSchema.shape.id,
      count: PositiveNumberNonZero,
      prey_bonus_id: PreyBonusSchema.shape.id.nullable().optional(),
    })
  ),
  looted_items: z.array(
    z.object({
      item_id: ItemSchema.shape.id,
      count: PositiveNumberNonZero,
    })
  ),
  supplies: z.array(
    z.object({
      supply_id: ItemSchema.shape.id,
      count: PositiveNumberNonZero,
    })
  ),
  damage_elements: z.array(
    z.object({
      damage_element_id: DamageElementSchema.shape.id,
      percent: PositiveNumberNonZero,
    })
  ),
  damage_sources: z.array(
    z.object({
      damage_source_id: DamageSourceSchema.shape.id,
      percent: PositiveNumberNonZero,
    })
  ),
});

export const UpdateHuntSessionPayloadSchema = CreateHuntSessionPayloadSchema.extend({
  id: HuntSessionSchema.shape.id,
});

export const DeleteHuntSessionPayloadSchema = z.object({
  id: HuntSessionSchema.shape.id,
});
