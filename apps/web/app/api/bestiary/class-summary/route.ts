import { NextResponse } from "next/server";

import { handleApiError } from "@/core/api";
import {
  CharacterBestiaryClassRequestSchema,
  fetchCharacterBestiaryClassSummary,
} from "@/modules/bestiary";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const { data, success } = CharacterBestiaryClassRequestSchema.safeParse({
      characterId: searchParams.get("characterId"),
      bestiaryClass: searchParams.get("bestiaryClass"),
    });

    if (!success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { data: summaryData, cacheTag } = await fetchCharacterBestiaryClassSummary({
      characterId: data.characterId,
      bestiaryClass: data.bestiaryClass,
    });

    return NextResponse.json(summaryData, {
      headers: {
        "x-nextjs-cache-tags": cacheTag,
      },
    });
  } catch (e) {
    return handleApiError(e);
  }
}
