"use server";

import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { insertCharacterExpHistory } from "@/modules/character/actions";
import { getCharacterList } from "../server";

export async function syncAllHistory() {
  await requireAuthenticatedSupabase();

  const characters = await getCharacterList();

  const results = await Promise.allSettled(
    characters.map((char) => insertCharacterExpHistory(char))
  );

  const totalNewEntries = results.reduce((acc, res) => {
    if (res.status === "fulfilled") return acc + res.value.count;
    return acc;
  }, 0);

  return {
    success: true,
    totalNewEntries,
  };
}
