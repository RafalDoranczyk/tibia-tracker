import { NextResponse } from "next/server";

import { handleApiError } from "@/core/api";
import {
  CharacterBestiaryClassQuerySchema,
  getCharacterBestiaryClassSummary,
} from "@/modules/bestiary";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = CharacterBestiaryClassQuerySchema.safeParse({
      characterId: searchParams.get("characterId"),
      bestiaryClass: searchParams.get("bestiaryClass"),
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { data, cacheTag } = await getCharacterBestiaryClassSummary(
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
