"use server";

import { DeleteHuntSessionPayloadSchema, dbDeleteHuntSession } from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { HuntSessionCache } from "../cache/hunt-session";

export async function deleteHuntSession(payload: unknown): Promise<void> {
  const { id, character_id } = assertZodParse(DeleteHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await dbDeleteHuntSession({ supabase, id });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to delete hunt session");
  }

  updateTag(HuntSessionCache.huntSessionList(character_id));
}
