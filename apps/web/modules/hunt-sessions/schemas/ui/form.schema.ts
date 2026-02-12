import { z } from "zod";

import { MonsterSchema } from "@/modules/bestiary";
import { CharmSchema } from "@/modules/charms";
import { ItemSchema } from "@/modules/items";

import { DamageElementSchema } from "../db/damage-elements.schema";
import { HuntSessionDbBaseFieldsSchema } from "../db/hunt-session.schema";
import { PreyBonusSchema } from "../db/prey-bonus.schema";

const KilledMonsterSchema = z.object({
  monsterId: MonsterSchema.shape.id,
  count: z.number(),
  preyBonusId: PreyBonusSchema.shape.id.nullable().optional(),
  charmBonusId: CharmSchema.shape.id.nullable().optional(),
});

const LootedItemsFormSchema = z.object({
  itemId: ItemSchema.shape.id,
  count: z.number(),
});

const DamageElementFormSchema = z.object({
  damageElementId: DamageElementSchema.shape.id,
  percent: z.number(),
});

const MonsterDamageSourceSchema = z.object({
  // damage source is always monster source
  monsterId: MonsterSchema.shape.id,
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
  monster_damage_sources: MonsterDamageSourceSchema.array(),
  supplies: SupplyCountFormSchema.array(),
});

export type HuntSessionForm = z.infer<typeof HuntSessionFormSchema>;
