import { z } from "zod";

import { PositiveNumber, SupabaseId } from "@/schemas/shared";

import { HuntPlaceSchema } from "../hunt-spots";

// ========================================
// Hunt Sessions
// ========================================

export const HuntSessionSchema = z.object({
  id: z.number(),
  user_id: SupabaseId,
  player_count: PositiveNumber,
  level: PositiveNumber,
  balance: PositiveNumber,
  raw_xp_gain: PositiveNumber,
  date: z.string(),
  minutes: PositiveNumber,
  exp_per_hour: PositiveNumber,
  profit_per_hour: PositiveNumber,
  place: HuntPlaceSchema, // join
});

export type HuntSession = z.infer<typeof HuntSessionSchema>;

// ========================================
// API Schemas - derived from main schema
// ========================================

// Create / Update payloads
export const CreateHuntSessionPayloadSchema = HuntSessionSchema.omit({
  id: true,
});

export type CreateHuntSessionPayload = z.infer<typeof CreateHuntSessionPayloadSchema>;

export const UpdateHuntSessionPayloadSchema = HuntSessionSchema.partial().omit({
  user_id: true,
});

export type UpdateHuntSessionPayload = z.infer<typeof UpdateHuntSessionPayloadSchema>;

export const DeleteHuntSessionPayloadSchema = z.object({
  id: z.number(),
});

export type DeleteHuntSessionPayload = z.infer<typeof DeleteHuntSessionPayloadSchema>;

// Fetch payload
export const FetchHuntSessionsPayloadSchema = z.object({
  user_id: z.string().optional(),
  limit: z.number().min(1).optional(),
  offset: z.number().min(0).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  orderBy: z.enum(["date", "level", "balance", "profit_per_hour"]).optional(),
});

export type FetchHuntSessionsPayload = z.infer<typeof FetchHuntSessionsPayloadSchema>;

// Fetch response
export const FetchHuntSessionsResponseSchema = z.object({
  count: z.number(),
  data: z.array(HuntSessionSchema),
});

export type FetchHuntSessionsResponse = z.infer<typeof FetchHuntSessionsResponseSchema>;

export const SupplyItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  image_url: z.string(),
});
export type SupplyItem = z.infer<typeof SupplyItemSchema>;

// ========================================
// Hunt Session relations
// ========================================

export const HuntSessionSupplySchema = z.object({
  id: z.number(),
  hunt_session_id: SupabaseId,
  supply_id: SupabaseId,
  amount: PositiveNumber,
});

export type HuntSessionSupply = z.infer<typeof HuntSessionSupplySchema>;

export const HuntSessionMonsterSchema = z.object({
  id: z.number(),
  hunt_session_id: SupabaseId,
  monster_id: SupabaseId,
  count: PositiveNumber,
});

export type HuntSessionMonster = z.infer<typeof HuntSessionMonsterSchema>;

export const HuntSessionDamageTypeSchema = z.object({
  id: z.number(),
  hunt_session_id: SupabaseId,
  element: z.enum(["Physical", "Fire", "Energy", "Earth", "Ice", "Death", "Holy", "Poison"]),
  percent: z.number().min(0).max(100),
});

export type HuntSessionDamageType = z.infer<typeof HuntSessionDamageTypeSchema>;

export const HuntSessionDamageSourceSchema = z.object({
  id: z.number(),
  hunt_session_id: SupabaseId,
  monster_id: SupabaseId,
  percent: z.number().min(0).max(100),
});

export type HuntSessionDamageSource = z.infer<typeof HuntSessionDamageSourceSchema>;

export const CreateHuntSessionFullPayloadSchema = z.object({
  level: z.number().min(1),
  balance: z.number(),
  raw_xp_gain: z.number(),
  minutes: z.number(),
  place_id: z.number(),
  date: z.string().optional(),
  player_count: PositiveNumber,
  monsters: z
    .array(
      z.object({
        name: z.string(),
        count: z.number(),
      })
    )
    .optional(),

  supplies: z
    .array(
      z.object({
        item: z.number(),
        amount: z.number(),
      })
    )
    .optional(),

  damageTypes: z
    .array(
      z.object({
        type: z.string(),
        percent: z.number(),
      })
    )
    .optional(),

  damageSources: z
    .array(
      z.object({
        monster: z.string(),
        percent: z.number(),
      })
    )
    .optional(),
});

export type CreateHuntSessionFullPayload = z.infer<typeof CreateHuntSessionFullPayloadSchema>;

export const HuntSessionFormSchema = z.object({
  level: z.number(),
  raw_xp_gain: z.number(),
  balance: z.number(),
  minutes: z.number(),
  date: z.string(),
  place_id: z.number(),
  player_count: z.number(),

  monsters: z.array(
    z.object({
      name: z.string(),
      count: z.number(),
    })
  ),

  supplies: z
    .array(
      z.object({
        item: z.number(),
        amount: z.number(),
      })
    )
    .refine((items) => new Set(items.map((i) => i.item)).size === items.length, {
      message: "Supplies must be unique",
    }),

  damageTypes: z.array(
    z.object({
      type: z.string(),
      percent: z.number(),
    })
  ),

  damageSources: z.array(
    z.object({
      monster: z.string(),
      percent: z.number(),
    })
  ),
});

export type HuntSessionFormValues = z.infer<typeof HuntSessionFormSchema>;
