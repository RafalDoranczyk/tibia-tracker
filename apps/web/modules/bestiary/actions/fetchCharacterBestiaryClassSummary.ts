"use server";

import { serverFetch } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";

export async function fetchCharacterBestiaryClassSummary(
  characterId: string,
  bestiaryClass: string
) {
  const res = await serverFetch(
    `/api/bestiary/class-summary?characterId=${characterId}&bestiaryClass=${encodeURIComponent(
      bestiaryClass
    )}`,
    {
      next: {
        tags: [BestiaryCacheTags.classSummary(characterId, bestiaryClass)],
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("fetch class-summary failed:", res.status, text.slice(0, 100));
    throw new Error(`Failed to fetch class summary (${res.status})`);
  }

  return res.json();
}
