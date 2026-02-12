"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import {
  FetchHuntSessionListPayloadSchema,
  type FetchHuntSessionListResponse,
  FetchHuntSessionListResponseSchema,
} from "../schemas";
import { getHuntSessionList } from "../server";

export async function fetchHuntSessionList(
  payload: unknown
): Promise<FetchHuntSessionListResponse> {
  const params = assertZodParse(FetchHuntSessionListPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, count, error } = await getHuntSessionList(supabase, params);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt sessions");
  }

  return assertZodParse(FetchHuntSessionListResponseSchema, {
    count,
    data,
  });
}
