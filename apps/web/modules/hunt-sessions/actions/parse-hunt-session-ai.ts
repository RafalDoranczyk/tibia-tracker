"use server";

import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { parseHuntSessionImage } from "../parsers/parseHuntSessionImage";

export async function parseHuntSessionAI(formData: FormData) {
  await requireAuthenticatedSupabase();

  const file = formData.get("image") as File;

  if (!file) {
    return { success: false, error: "No image provided" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    const result = await parseHuntSessionImage(base64Image);

    if (!(result.success && result.data)) {
      return { success: false, error: result.error || "AI failed to parse the image" };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, error: "Failed to process image" };
  }
}
