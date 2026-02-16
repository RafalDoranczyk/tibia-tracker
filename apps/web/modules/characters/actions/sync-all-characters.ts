"use server";

import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { CharactersCache } from "../cache/characters-cache";
import { CHARACTER_CACHE_DURATION_MINUTES } from "../constants";
import { getCharacterList } from "../server";
import { dbUpdateAllCharactersSynchronizedAt } from "../server/mutations/characters";

export async function syncAllCharacters() {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const characters = await getCharacterList();

  const lastSyncs = characters.map((c) =>
    c.synchronized_at ? new Date(c.synchronized_at).getTime() : 0
  );
  const newestSync = Math.max(0, ...lastSyncs);

  const now = Date.now();
  const diff = now - newestSync;

  if (newestSync > 0 && diff < CHARACTER_CACHE_DURATION_MINUTES * 60 * 1000) {
    const secondsLeft = Math.ceil((CHARACTER_CACHE_DURATION_MINUTES * 60 * 1000 - diff) / 1000);
    throw new Error(`COOLDOWN:${secondsLeft}`);
  }

  await dbUpdateAllCharactersSynchronizedAt(supabase, user.id);

  characters.forEach((char) => {
    updateTag(CharactersCache.byName(char.name));
  });

  updateTag(CharactersCache.characterList(user.id));

  return { success: true };
}
