import {
  createAdminClient,
  dbGetHuntSessionList,
  type FetchHuntSessionListPayload,
  FetchHuntSessionListPayloadSchema,
  type FetchHuntSessionListResponse,
  FetchHuntSessionListResponseSchema,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { HuntSessionCache } from "../cache/hunt-session";

async function getCachedSessionList(params: FetchHuntSessionListPayload) {
  "use cache";
  cacheLife("max");
  cacheTag(HuntSessionCache.huntSessionList(params.character_id));

  const supabase = createAdminClient();

  const { data, error, count } = await dbGetHuntSessionList({ supabase, payload: params });

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
