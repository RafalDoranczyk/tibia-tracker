import { NextResponse } from "next/server";

import { getUserScopedQuery } from "@/core";
import { CharacterBestiarySummarySchema } from "@/modules/bestiary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const characterId = searchParams.get("characterId");
  if (!characterId) return NextResponse.json({ error: "Missing characterId" }, { status: 400 });

  const { supabase } = await getUserScopedQuery();
  const { data, error } = await supabase
    .from("character_bestiary_summary")
    .select("*")
    .eq("character_id", characterId)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const parsed = CharacterBestiarySummarySchema.parse(data);

  return NextResponse.json(parsed, {
    headers: {
      "x-nextjs-cache-tags": `bestiary-summary:${characterId}`,
    },
  });
}
