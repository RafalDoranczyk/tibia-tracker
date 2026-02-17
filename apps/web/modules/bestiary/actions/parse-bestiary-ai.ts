"use server";

import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { getMonsterList } from "@/modules/hunt-sessions/server";
import { parseBestiaryImage } from "../parsers/parseBestiaryImage";
import type { AIMonsterScan } from "../schemas";

export async function parseBestiaryAI(formData: FormData) {
  await requireAuthenticatedSupabase();

  const file = formData.get("image") as File;

  if (!file) {
    return { success: false, error: "No image provided" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    const result = await parseBestiaryImage(base64Image);

    if (!(result.success && result.data)) {
      return { success: false, error: result.error || "AI failed to parse the image" };
    }

    const allMonsters = await getMonsterList();

    const enrichedMonsters: AIMonsterScan[] = result.data.monsters.map((aiMonster) => {
      const dbMonster = allMonsters.find(
        (m) => m.name.toLowerCase() === aiMonster.name.toLowerCase()
      );

      return {
        name: aiMonster.name,
        stage: aiMonster.stage,
        has_soul: aiMonster.has_soul,
        image_path: dbMonster?.image_path,
      };
    });

    return {
      success: true,
      data: { monsters: enrichedMonsters },
    };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, error: "Failed to process image" };
  }
}
