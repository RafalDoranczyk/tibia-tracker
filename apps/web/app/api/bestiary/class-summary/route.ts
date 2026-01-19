import { NextResponse } from "next/server";

import { getUserScopedQuery } from "@/core";
import { BestiaryCacheTags, CharacterBestiaryClassSummarySchema } from "@/modules/bestiary";

function createEmptyBestiaryClassSummary(characterId: string, bestiaryClass: string) {
  return CharacterBestiaryClassSummarySchema.parse({
    character_id: characterId,
    bestiary_class: bestiaryClass,
    total_monsters: 0,
    completed_monsters: 0,
    completed_soulpits: 0,
    total_charm_points: 0,
    unlocked_charm_points: 0,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const characterId = searchParams.get("characterId");
  const bestiaryClass = searchParams.get("bestiaryClass");

  if (!(characterId && bestiaryClass)) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("character_bestiary_class_summary")
    .select("*")
    .eq("character_id", characterId)
    .eq("bestiary_class", bestiaryClass)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    const empty = createEmptyBestiaryClassSummary(characterId, bestiaryClass);

    return NextResponse.json(empty, {
      headers: {
        "x-nextjs-cache-tags": BestiaryCacheTags.classSummary(characterId, bestiaryClass),
      },
    });
  }

  const parsed = CharacterBestiaryClassSummarySchema.parse(data);

  return NextResponse.json(parsed, {
    headers: {
      "x-nextjs-cache-tags": BestiaryCacheTags.classSummary(characterId, bestiaryClass),
    },
  });
}
