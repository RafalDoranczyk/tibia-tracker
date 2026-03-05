"use server";

import {
  type HuntSessionDbFields,
  HuntSessionDbFieldsSchema,
  HuntSessionsRepo,
  UpdateHuntSessionPayloadSchema,
} from "@repo/database/hunt-sessions";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { HuntSessionCache } from "../cache";

export async function updateHuntSession(payload: unknown): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(UpdateHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await HuntSessionsRepo.update(supabase, parsed);

  if (error || !data) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update hunt session");
  }

  updateTag(HuntSessionCache.huntSessionList(parsed.character_id));
  updateTag(HuntSessionCache.huntSession(parsed.id));

  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
