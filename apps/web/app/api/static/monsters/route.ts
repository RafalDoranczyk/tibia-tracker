import { NextResponse } from "next/server";

import { handleApiError } from "@/core/api";
import type { Monster } from "@/modules/bestiary";
import { getMonsterList } from "@/modules/bestiary/server";

let cache: Monster[] | null = null;
let lastFetch = 0;
// Cache for 24h
const CACHE_TIME = 60 * 60 * 24 * 1000;
const headers: HeadersInit = { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate" };

export async function GET() {
  try {
    if (cache && Date.now() - lastFetch < CACHE_TIME) {
      return NextResponse.json({ data: cache }, { headers });
    }

    const data = await getMonsterList();

    cache = data;
    lastFetch = Date.now();

    return NextResponse.json({ data: cache }, { headers });
  } catch (e) {
    return handleApiError(e);
  }
}
