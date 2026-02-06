"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedSupabase } from "@/core/supabase";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils";

import { DeleteHuntSessionPayloadSchema } from "../schemas";

export async function deleteHuntSession(payload: unknown): Promise<void> {
  const data = assertZodParse(DeleteHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await supabase.from("hunt_sessions").delete().eq("id", data.id);

  if (error) {
    throw new Error("Failed to delete hunt session");
  }

  revalidatePath(PATHS.CHARACTER(data.id.toString()).HUNT_SESSIONS.LIST);
}
