"use server";

import {
  CreateHuntSessionPayloadSchema,
  type HuntSessionDbFields,
  HuntSessionDbFieldsSchema,
  HuntSessionsRepo,
} from "@repo/database/hunt-sessions";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { HuntSessionCache } from "../cache";

export async function createHuntSession(payload: unknown): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(CreateHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await HuntSessionsRepo.create(supabase, parsed);

  if (error || !data) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to create hunt session");
  }

  updateTag(HuntSessionCache.huntSessionList(parsed.character_id));

  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
