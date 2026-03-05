import { CharmSchema } from "@repo/database/charms";
import { DamageElementSchema } from "@repo/database/damage-elements";
import { HuntSessionDbBaseFieldsSchema } from "@repo/database/hunt-sessions";
import { ItemSchema } from "@repo/database/items";
import { MonsterSchema } from "@repo/database/monsters";
import { PreyBonusSchema } from "@repo/database/prey-bonuses";
import { z } from "@repo/validation";

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

const HuntSessionMonsterDamageSourceSchema = z.object({
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
  monster_damage_sources: HuntSessionMonsterDamageSourceSchema.array(),
  supplies: SupplyCountFormSchema.array(),
  damage_elements: DamageElementFormSchema.array(),
});

export type HuntSessionForm = z.infer<typeof HuntSessionFormSchema>;
