"use server";

import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import {
  FetchHuntSessionListPayloadSchema,
  type FetchHuntSessionListResponse,
  FetchHuntSessionListResponseSchema,
  HuntSessionDbFieldsSchema,
} from "../schemas";

const DB_KEYS = Object.keys(HuntSessionDbFieldsSchema.shape).join(", ");

const SELECT = `
  ${DB_KEYS},
  place:hunt_places!inner(id, name, image_path)
`;

export async function fetchHuntSessionList(
  payload: unknown
): Promise<FetchHuntSessionListResponse> {
  const { limit, page, sortBy, sortDirection, character_id } = assertZodParse(
    FetchHuntSessionListPayloadSchema,
    payload
  );

  const offset = page && limit ? (page - 1) * limit : undefined;

  const { supabase } = await requireAuthenticatedSupabase();

  let query = supabase
    .from("hunt_sessions")
    .select(SELECT, { count: "exact" })
    .order("date", { ascending: false })
    .eq("character_id", character_id);

  if (sortBy) {
    query = query.order(sortBy, {
      ascending: sortDirection !== "desc",
    });
  }

  if (typeof limit === "number") {
    const from = offset ?? 0;
    const to = from + limit - 1;
    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) {
    throw new Error("Failed to fetch hunt sessions");
  }

  return assertZodParse(FetchHuntSessionListResponseSchema, { count, data });
}
