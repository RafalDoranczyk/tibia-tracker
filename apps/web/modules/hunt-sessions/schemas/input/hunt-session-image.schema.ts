import z from "zod";

const numericField = z
  .number()
  .nullish()
  .transform((val) => val ?? 0);

const resistanceValue = z.preprocess((val) => {
  if (typeof val === "string") return parseFloat(val.replace("%", ""));
  return val;
}, z.number().min(0).max(100).nullable());

export const AIHuntSessionScanSchema = z.object({
  skills_window: z
    .object({
      base_stats: z.object({
        level: z.number(),
        xp: numericField,
        armor_value: numericField,
        defense_value: numericField,
        mitigation: numericField,
      }),
      resistances: z.object({
        physical: resistanceValue,
        fire: resistanceValue,
        earth: resistanceValue,
        energy: resistanceValue,
        ice: resistanceValue,
        holy: resistanceValue,
        death: resistanceValue,
        mana_drain: resistanceValue,
        life_drain: resistanceValue,
      }),

      skill_levels: z.record(
        z.string(),
        z
          .number()
          .nullish()
          .transform((v) => v ?? 0)
      ),
    })
    .nullable(),
  hunt_analyser: z
    .object({
      session_duration: z.string().default("00:00h"),
      raw_xp_gain: numericField,
      xp_gain: numericField,
      raw_xp_h: numericField,
      xp_h: numericField,
      loot: numericField,
      supplies: numericField,
      balance: numericField,
      damage_total: numericField,
      damage_h: numericField,
      healing_total: numericField,
      healing_h: numericField,
      killed_monsters: z
        .array(
          z.object({
            name: z.string(),
            amount: z.number(),
          })
        )
        .default([]),
    })
    .nullable(),
});

export type AIHuntSessionScan = z.infer<typeof AIHuntSessionScanSchema>;
