import { NextResponse } from "next/server";

import { handleApiError } from "@/core/api";
import {
  CharacterBestiarySummaryRequestSchema,
  fetchCharacterBestiarySummary,
} from "@/modules/bestiary";

export async function GET(request: Request) {
  try {
    const parsed = CharacterBestiarySummaryRequestSchema.safeParse({
      characterId: new URL(request.url).searchParams.get("characterId"),
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { data, cacheTag } = await fetchCharacterBestiarySummary(parsed.data.characterId);

    return NextResponse.json(data, {
      headers: {
        "x-nextjs-cache-tags": cacheTag,
      },
    });
  } catch (e) {
    return handleApiError(e);
  }
}
