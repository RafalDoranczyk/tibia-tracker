import {
  createAdminClient,
  dbGetHuntSession,
  type FetchHuntSessionPayload,
  FetchHuntSessionPayloadSchema,
  type HuntSession,
  HuntSessionSchema,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { HuntSessionCache } from "../cache/hunt-session";

async function getCachedHuntSession(payload: FetchHuntSessionPayload) {
  "use cache";
  cacheLife("max");
  cacheTag(HuntSessionCache.huntSession(payload.id));

  const supabase = createAdminClient();

  const { data, error, count } = await dbGetHuntSession({
    supabase,
    character_id: payload.character_id,
    id: payload.id,
  });

  if (error) throw error;
  return { data, count };
}

export async function getHuntSession(payload: unknown): Promise<HuntSession | null> {
  const validatedPayload = assertZodParse(FetchHuntSessionPayloadSchema, payload);

  await requireAuthenticatedSupabase();

  try {
    const { data } = await getCachedHuntSession(validatedPayload);

    if (!data) return null;

    return assertZodParse(HuntSessionSchema, data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt session");
  }
}
