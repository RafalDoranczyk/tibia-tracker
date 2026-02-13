"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { PATHS } from "@/core/paths";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { DeleteHuntSessionPayloadSchema } from "../schemas";
import { dbDeleteHuntSession } from "../server";

export async function deleteHuntSession(payload: unknown): Promise<void> {
  const { id } = assertZodParse(DeleteHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await dbDeleteHuntSession(supabase, id);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to delete hunt session");
  }

  revalidatePath(PATHS.CHARACTER(id.toString()).HUNT_SESSIONS.LIST);
}
