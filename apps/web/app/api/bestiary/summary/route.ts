import { NextResponse } from "next/server";

import {
  CharacterBestiarySummaryQuerySchema,
  getCharacterBestiarySummary,
} from "@/modules/bestiary";

export async function GET(request: Request) {
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
}
