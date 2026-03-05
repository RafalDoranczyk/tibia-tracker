"use server";

import { revalidatePath } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import type { SetupNewGlobalCharacterProps } from "../server/setup-new-global-character";
import { syncExistingGlobalCharacter } from "../server/sync-existing-global-character";

export async function syncCharacterExpHistory(
  character: SetupNewGlobalCharacterProps["character"]
) {
  const { supabase } = await requireAuthenticatedSupabase();

  try {
    const result = await syncExistingGlobalCharacter({ supabase, character });
    revalidatePath("/dashboard");
    return { success: true, count: result };
  } catch {
    return { success: false, error: "Sync failed" };
  }
}
