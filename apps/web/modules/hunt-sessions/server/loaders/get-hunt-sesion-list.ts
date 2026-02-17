import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";
import { HuntSessionCache } from "../../cache/hunt-session-cache";
import {
  type FetchHuntSessionListPayload,
  FetchHuntSessionListPayloadSchema,
  type FetchHuntSessionListResponse,
  FetchHuntSessionListResponseSchema,
} from "../../schemas";
import { dbGetHuntSessionList } from "../queries/get-hunt-session-list";

async function getCachedSessionList(params: FetchHuntSessionListPayload) {
  "use cache";
  cacheLife("max");
  cacheTag(HuntSessionCache.huntSessionList(params.character_id));

  const supabase = createAdminClient();

  const { data, error, count } = await dbGetHuntSessionList(supabase, params);

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
