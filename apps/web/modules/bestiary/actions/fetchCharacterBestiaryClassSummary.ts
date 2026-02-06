"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { assertZodParse, serverFetch } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";
import { type BestiaryClass, CharacterBestiaryClassSummarySchema } from "../schemas";

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
    throw wrapAndLogError(
      null,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch bestiary class summary"
    );
  }

  const json = await res.json();

  return assertZodParse(CharacterBestiaryClassSummarySchema, json);
}
