import { z } from "zod";

import { CharmSchema } from "@/modules/charms";

import { PreyBonusSchema } from "./catalog.schema";
import { HuntSessionDbBaseFieldsSchema, HuntSessionStatFormSchema } from "./db.schema";

const KilledMonsterSchema = z.object({
  monsterId: z.number(),
  count: z.number(),
  preyBonusId: PreyBonusSchema.shape.id.nullable().optional(),
  charmBonusId: CharmSchema.shape.id.nullable().optional(),
});

const LootedItemsFormSchema = z.object({
  itemId: z.number(),
  count: z.number(),
});

const DamageElementFormSchema = z.object({
  damageElementId: z.number(),
  percent: z.number(),
});

const DamageSourceFormSchema = z.object({
  damageSourceId: z.number(),
  percent: z.number(),
});

const SupplyCountFormSchema = z.object({
  supplyId: z.number(),
  count: z.number(),
});

// Full form schema. Id is optional for new sessions
export const HuntSessionFormSchema = HuntSessionDbBaseFieldsSchema.omit({
  character_id: true,
}).extend({
  id: HuntSessionDbBaseFieldsSchema.shape.id.optional(),
  killed_monsters: KilledMonsterSchema.array(),
  looted_items: LootedItemsFormSchema.array(),
  damage_elements: DamageElementFormSchema.array(),
  damage_sources: DamageSourceFormSchema.array(),
  supplies: SupplyCountFormSchema.array(),
  stats: HuntSessionStatFormSchema.array(),
});

export type HuntSessionForm = z.infer<typeof HuntSessionFormSchema>;
