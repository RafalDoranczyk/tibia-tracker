import { z } from "zod";
import { HuntPlaceSchema } from "@/modules/hunt-places";
import { MonsterSchema } from "@/modules/monsters";

export const MonsterAvgStatsSchema = z.object({
  monster_id: MonsterSchema.shape.id,
  monster_name: MonsterSchema.shape.name,
  image_url: MonsterSchema.shape.image_path,
  exp: z.number(),
  avg_count_per_hour: z.number(),
});

export const HuntSpotSchema = z.object({
  place_id: HuntPlaceSchema.shape.id,
  place_name: HuntPlaceSchema.shape.name,
  place_image_path: HuntPlaceSchema.shape.image_path,
  total_sessions: z.number(),
  total_duration_seconds: z.number(),
  last_hunted_at: z.date().or(z.string()),
  sessions_analyzed: z.number(),
  avg_raw_xp_h: z.number(),
  avg_profit_h: z.number(),
  avg_damage_h: z.number(),
  avg_healing_h: z.number(),
  max_raw_xp_h: z.number(),
  max_profit_h: z.number(),
  avg_monsters_per_hour: z.array(MonsterAvgStatsSchema),
});

export type HuntSpot = z.infer<typeof HuntSpotSchema>;
