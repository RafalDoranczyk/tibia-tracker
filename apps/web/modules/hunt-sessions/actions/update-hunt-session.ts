"use server";

import { updateTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { HuntSessionCache } from "../cache/hunt-session-cache";
import {
  type HuntSessionDbFields,
  HuntSessionDbFieldsSchema,
  UpdateHuntSessionPayloadSchema,
} from "../schemas";
import { dbUpdateHuntSession } from "../server";

export async function updateHuntSession(payload: unknown): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(UpdateHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbUpdateHuntSession(supabase, parsed);

  if (error || !data) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update hunt session");
  }

  updateTag(HuntSessionCache.huntSessionList(parsed.character_id));

  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
