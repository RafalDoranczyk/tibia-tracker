import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import {
  FetchHuntSessionListPayloadSchema,
  type FetchHuntSessionListResponse,
  FetchHuntSessionListResponseSchema,
} from "../../schemas";
import { dbGetHuntSessionList } from "../queries/get-hunt-session-list";

export async function getHuntSessionList(payload: unknown): Promise<FetchHuntSessionListResponse> {
  const params = assertZodParse(FetchHuntSessionListPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, count, error } = await dbGetHuntSessionList(supabase, params);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt sessions");
  }

  return assertZodParse(FetchHuntSessionListResponseSchema, {
    count,
    data,
  });
}
