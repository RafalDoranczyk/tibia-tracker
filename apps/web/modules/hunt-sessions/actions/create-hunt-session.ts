"use server";

import {
  CreateHuntSessionPayloadSchema,
  dbInsertHuntSessionRPC,
  type HuntSessionDbFields,
  HuntSessionDbFieldsSchema,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { HuntSessionCache } from "../cache/hunt-session";

export async function createHuntSession(payload: unknown): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(CreateHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbInsertHuntSessionRPC({ supabase, payload: parsed });

  if (error || !data) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to create hunt session");
  }

  updateTag(HuntSessionCache.huntSessionList(parsed.character_id));

  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
