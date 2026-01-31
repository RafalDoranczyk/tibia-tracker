"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import {
  FetchHuntSessionListPayloadSchema,
  FetchHuntSessionListResponseSchema,
  HuntSessionDbFieldsSchema,
} from "../schemas";
import type { FetchHuntSessionListPayload, FetchHuntSessionListResponse } from "../types";

const HuntSessionDbKeys = Object.keys(HuntSessionDbFieldsSchema.shape).join(", ");

const HUNT_SESSIONS_SELECT = `
  ${HuntSessionDbKeys},
  place:hunt_places!inner(id, name, image_path)
`;

export async function fetchHuntSessionsList(
  payload: FetchHuntSessionListPayload
): Promise<FetchHuntSessionListResponse> {
  const { limit, offset, order, orderBy } = assertZodParse(
    FetchHuntSessionListPayloadSchema,
    payload
  );

  const { supabase } = await getUserScopedQuery();

  let query = supabase
    .from("hunt_sessions")
    .select(HUNT_SESSIONS_SELECT, { count: "exact" })
    .order("date", { ascending: false })
    .eq("character_id", payload.character_id);

  if (orderBy) {
    query = query.order(orderBy, {
      ascending: order !== "desc",
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
