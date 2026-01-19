"use server";

import { assertZodParse, serverFetch } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";
import { CharacterBestiarySummarySchema } from "../schemas";

export async function fetchCharacterBestiarySummary(characterId: string) {
  const res = await serverFetch(`/api/bestiary/summary?characterId=${characterId}`, {
    next: { tags: [BestiaryCacheTags.summary(characterId)] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bestiary summary");
  }

  const json = await res.json();

  return assertZodParse(CharacterBestiarySummarySchema, json);
}
