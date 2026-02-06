import { NextResponse } from "next/server";

import { handleApiError } from "@/core/api/handleApiError";
import {
  CharacterBestiarySummaryQuerySchema,
  getCharacterBestiarySummary,
} from "@/modules/bestiary";

export async function GET(request: Request) {
  try {
    const parsed = CharacterBestiarySummaryQuerySchema.safeParse({
      characterId: new URL(request.url).searchParams.get("characterId"),
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { data, cacheTag } = await getCharacterBestiarySummary(parsed.data.characterId);

    return NextResponse.json(data, {
      headers: {
        "x-nextjs-cache-tags": cacheTag,
      },
    });
  } catch (e) {
    return handleApiError(e);
  }
}
