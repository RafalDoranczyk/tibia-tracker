import { z } from "zod";

export const AIMonsterScanSchema = z.object({
  name: z.string(),
  stage: z.number().min(0).max(3),
  has_soul: z.boolean(),
  image_path: z.string().optional(),
});
export type AIMonsterScan = z.infer<typeof AIMonsterScanSchema>;

export const AIMonsterScanResultSchema = z.object({
  monsters: z.array(AIMonsterScanSchema),
});
export type AIMonsterScanResult = z.infer<typeof AIMonsterScanResultSchema>;
