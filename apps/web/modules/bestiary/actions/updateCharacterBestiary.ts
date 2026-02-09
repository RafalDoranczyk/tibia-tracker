"use server";

import { revalidateTag } from "next/cache";

import { assertZodParse } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";
import { UpdateCharacterBestiaryEntrySchema } from "../schemas";
import { updateCharacterBestiary } from "../server/mutations/updateCharacterBestiary";

export async function updateCharacterBestiaryAction(payload: unknown) {
  const parsed = assertZodParse(UpdateCharacterBestiaryEntrySchema, payload);

  const { characterId } = parsed;

  await updateCharacterBestiary(parsed);

  revalidateTag(BestiaryCacheTags.summary(characterId));
}
