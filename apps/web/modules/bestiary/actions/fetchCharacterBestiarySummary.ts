"use server";

import { serverFetch } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";

export async function fetchCharacterBestiarySummary(characterId: string) {
  const res = await serverFetch(`/api/bestiary/summary?characterId=${characterId}`, {
    next: { tags: [BestiaryCacheTags.summary(characterId)] },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[fetchCharacterBestiarySummary] ❌ ${res.status} | ${text.slice(0, 200)}`);
    throw new Error(`Failed to fetch summary (${res.status})`);
  }

  return res.json();
}
