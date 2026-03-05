import { createAdminSupabaseClient } from "@repo/database/client";
import {
  type FetchHuntSessionPayload,
  FetchHuntSessionPayloadSchema,
  type HuntSession,
  HuntSessionSchema,
  HuntSessionsRepo,
} from "@repo/database/hunt-sessions";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { HuntSessionCache } from "../cache";

async function getCachedHuntSession(payload: FetchHuntSessionPayload) {
  "use cache";
  cacheLife("max");
  cacheTag(HuntSessionCache.huntSession(payload.id));

  const supabase = createAdminSupabaseClient();

  const { data, error, count } = await HuntSessionsRepo.getById(supabase, {
    id: payload.id,
    characterId: payload.character_id,
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
