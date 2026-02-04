import { z } from "zod";

import { PaginationSchema } from "@/lib/pagination";
import { MonsterSchema } from "@/modules/bestiary";
import { CharacterSchema } from "@/modules/characters";
import { ItemSchema } from "@/modules/items";
import { NonNegativeInt, PositiveInt } from "@/schemas";

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

export const FetchHuntSessionListPayloadSchema = PaginationSchema.extend({
  character_id: CharacterSchema.shape.id,
});
export type FetchHuntSessionListPayload = z.infer<typeof FetchHuntSessionListPayloadSchema>;

export const HuntSessionListFiltersSchema = PaginationSchema;
export type HuntSessionListFilters = z.infer<typeof HuntSessionListFiltersSchema>;

export const FetchHuntSessionListResponseSchema = z.object({
  count: NonNegativeInt,
  data: z.array(HuntSessionListItemSchema),
});
export type FetchHuntSessionListResponse = z.infer<typeof FetchHuntSessionListResponseSchema>;

const HuntSessionKilledMonsterInputSchema = z.object({
  monster_id: MonsterSchema.shape.id,
  count: PositiveInt,
  prey_bonus_id: PreyBonusSchema.shape.id.nullable().optional(),
});
export type HuntSessionKilledMonsterInput = z.input<typeof HuntSessionKilledMonsterInputSchema>;

export const CreateHuntSessionPayloadSchema = HuntSessionDbBaseFieldsSchema.omit({
  id: true,
}).extend({
  killed_monsters: HuntSessionKilledMonsterInputSchema.array(),
  looted_items: z.array(
    z.object({
      item_id: ItemSchema.shape.id,
      count: PositiveInt,
    })
  ),
  supplies: z.array(
    z.object({
      supply_id: ItemSchema.shape.id,
      count: PositiveInt,
    })
  ),
  damage_elements: z.array(
    z.object({
      damage_element_id: DamageElementSchema.shape.id,
      percent: PositiveInt,
    })
  ),
  damage_sources: z.array(
    z.object({
      damage_source_id: DamageSourceSchema.shape.id,
      percent: PositiveInt,
    })
  ),
});
export type CreateHuntSessionPayload = z.input<typeof CreateHuntSessionPayloadSchema>;

export const UpdateHuntSessionPayloadSchema = CreateHuntSessionPayloadSchema.extend({
  id: HuntSessionSchema.shape.id,
});

export const DeleteHuntSessionPayloadSchema = z.object({
  id: HuntSessionSchema.shape.id,
});
