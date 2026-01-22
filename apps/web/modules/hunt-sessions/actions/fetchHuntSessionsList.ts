"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import {
  FetchHuntSessionsListPayloadSchema,
  FetchHuntSessionsListResponseSchema,
  HuntSessionDbFieldsSchema,
} from "../schemas";
import type { FetchHuntSessionsListPayload, FetchHuntSessionsListResponse } from "../types";

const HuntSessionDbKeys = Object.keys(HuntSessionDbFieldsSchema.shape).join(", ");

const HUNT_SESSIONS_SELECT = `
  ${HuntSessionDbKeys},
  place:hunting_places!inner(id, name, image_url)
`;

export async function fetchHuntSessionsList(
  payload: FetchHuntSessionsListPayload
): Promise<FetchHuntSessionsListResponse> {
  const { limit, offset, order, orderBy } = assertZodParse(
    FetchHuntSessionsListPayloadSchema,
    payload
  );

  const { supabase } = await getUserScopedQuery();

  let query = supabase
    .from("hunt_sessions")
    .select(HUNT_SESSIONS_SELECT, { count: "exact" })
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

  return assertZodParse(FetchHuntSessionsListResponseSchema, { count, data });
}
