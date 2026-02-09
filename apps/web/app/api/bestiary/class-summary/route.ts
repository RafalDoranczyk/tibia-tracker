import { NextResponse } from "next/server";

import { handleApiError } from "@/core/api";
import {
  CharacterBestiaryClassRequestSchema,
  fetchCharacterBestiaryClassSummary,
} from "@/modules/bestiary";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = CharacterBestiaryClassRequestSchema.safeParse({
      characterId: searchParams.get("characterId"),
      bestiaryClass: searchParams.get("bestiaryClass"),
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { data, cacheTag } = await fetchCharacterBestiaryClassSummary(
      parsed.data.characterId,
      parsed.data.bestiaryClass
    );

    return NextResponse.json(data, {
      headers: {
        "x-nextjs-cache-tags": cacheTag,
      },
    });
  } catch (e) {
    return handleApiError(e);
  }
}
