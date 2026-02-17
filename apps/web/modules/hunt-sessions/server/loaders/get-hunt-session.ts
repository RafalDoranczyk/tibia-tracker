import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";
import { HuntSessionCache } from "../../cache/hunt-session-cache";
import {
  type FetchHuntSessionPayload,
  FetchHuntSessionPayloadSchema,
  type HuntSession,
  HuntSessionSchema,
} from "../../schemas";
import { dbGetHuntSession } from "../queries/get-hunt-session";

async function getCachedHuntSession(payload: FetchHuntSessionPayload) {
  "use cache";
  cacheLife("max");
  cacheTag(HuntSessionCache.huntSession(payload.id));

  const supabase = createAdminClient();

  const { data, error, count } = await dbGetHuntSession(supabase, payload);

  if (error) throw error;
  return { data, count };
}

export async function getHuntSession(payload: unknown): Promise<HuntSession | null> {
  const { id, character_id } = assertZodParse(FetchHuntSessionPayloadSchema, payload);

  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedHuntSession({ character_id, id });
    if (!data) {
      return null;
    }

    return assertZodParse(HuntSessionSchema, data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt session");
  }
}
