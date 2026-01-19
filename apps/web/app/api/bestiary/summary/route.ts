import { NextResponse } from "next/server";

import { getUserScopedQuery } from "@/core";
import { CharacterBestiarySummarySchema } from "@/modules/bestiary";

function createEmptyCharacterBestiarySummary(characterId: string) {
  return CharacterBestiarySummarySchema.parse({
    character_id: characterId,
    unlocked_charm_points: 0,
    total_charm_points: 0,
    completed_soulpits: 0,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const characterId = searchParams.get("characterId");

  if (!characterId) {
    return NextResponse.json({ error: "Missing characterId" }, { status: 400 });
  }

  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("character_bestiary_summary")
    .select("character_id, unlocked_charm_points, total_charm_points, completed_soulpits")
    .eq("character_id", characterId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    const empty = createEmptyCharacterBestiarySummary(characterId);

    return NextResponse.json(empty, {
      headers: {
        "x-nextjs-cache-tags": `bestiary-summary:${characterId}`,
      },
    });
  }

  const parsed = CharacterBestiarySummarySchema.parse(data);

  return NextResponse.json(parsed, {
    headers: {
      "x-nextjs-cache-tags": `bestiary-summary:${characterId}`,
    },
  });
}
