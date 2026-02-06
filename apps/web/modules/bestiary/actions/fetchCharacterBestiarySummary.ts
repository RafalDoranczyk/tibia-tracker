"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { assertZodParse, serverFetch } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";
import { CharacterBestiarySummarySchema } from "../schemas";

export async function fetchCharacterBestiarySummary(characterId: string) {
  const res = await serverFetch(`/api/bestiary/summary?characterId=${characterId}`, {
    next: { tags: [BestiaryCacheTags.summary(characterId)] },
  });

  if (!res.ok) {
    throw wrapAndLogError(null, AppErrorCode.SERVER_ERROR, "Failed to fetch bestiary summary");
  }

  const json = await res.json();

  return assertZodParse(CharacterBestiarySummarySchema, json);
}
