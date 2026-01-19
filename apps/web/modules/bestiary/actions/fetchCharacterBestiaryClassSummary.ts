"use server";

import { assertZodParse, serverFetch } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";
import { CharacterBestiaryClassSummarySchema } from "../schemas";
import type { BestiaryClass } from "../types";

export async function fetchCharacterBestiaryClassSummary(
  characterId: string,
  bestiaryClass: BestiaryClass
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
    throw new Error("Failed to fetch bestiary class summary");
  }

  const json = await res.json();

  return assertZodParse(CharacterBestiaryClassSummarySchema, json);
}
