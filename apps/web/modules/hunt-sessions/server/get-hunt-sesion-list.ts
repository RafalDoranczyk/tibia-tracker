import { createAdminSupabaseClient } from "@repo/database/client";
import {
  type FetchHuntSessionListPayload,
  FetchHuntSessionListPayloadSchema,
  type FetchHuntSessionListResponse,
  FetchHuntSessionListResponseSchema,
  HuntSessionsRepo,
} from "@repo/database/hunt-sessions";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { HuntSessionCache } from "../cache";

async function getCachedSessionList(params: FetchHuntSessionListPayload) {
  "use cache";
  cacheLife("max");
  cacheTag(HuntSessionCache.huntSessionList(params.character_id));

  const supabase = createAdminSupabaseClient();

  const { data, error, count } = await HuntSessionsRepo.getList(supabase, params);

  if (error) throw error;

  return { data, count };
}

export async function getHuntSessionList(payload: unknown): Promise<FetchHuntSessionListResponse> {
  const params = assertZodParse(FetchHuntSessionListPayloadSchema, payload);

  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedSessionList(params);

    return assertZodParse(FetchHuntSessionListResponseSchema, data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt sessions");
  }
}
