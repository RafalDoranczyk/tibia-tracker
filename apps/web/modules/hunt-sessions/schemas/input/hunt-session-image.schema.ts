import z from "zod";

export const AIHuntSessionScanSchema = z.object({
  skills_window: z
    .object({
      level: z.number(),
      xp: z.number(),
      armor: z.number(),
      defense: z.number(),
      mitigation: z.number(),
      skills: z.record(z.string(), z.number()),
      resistances: z.record(z.string(), z.number().nullable()),
    })
    .nullable(),

  hunt_analyser: z
    .object({
      session: z.string(),
      raw_xp_gain: z.number(),
      xp_gain: z.number(),
      raw_xp_h: z.number(),
      xp_h: z.number(),
      loot: z.number(),
      supplies: z.number(),
      balance: z.number(),
      damage: z.number(),
      damage_h: z.number(),
      healing: z.number(),
      healing_h: z.number(),
      killed_monsters: z.array(
        z.object({
          name: z.string(),
          amount: z.number(),
        })
      ),
    })
    .nullable(),
});

export type AIHuntSessionScan = z.infer<typeof AIHuntSessionScanSchema>;
