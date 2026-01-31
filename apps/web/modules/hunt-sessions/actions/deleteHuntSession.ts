"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { DeleteHuntSessionPayloadSchema } from "../schemas";
import type { DeleteHuntSessionPayload } from "../types";

export async function deleteHuntSession(payload: DeleteHuntSessionPayload): Promise<void> {
  const data = assertZodParse(DeleteHuntSessionPayloadSchema, payload);

  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase.from("hunt_sessions").delete().eq("id", data.id);

  if (error) {
    throw new Error("Failed to delete hunt session");
  }

  revalidatePath(PATHS.CHARACTER(data.id.toString()).HUNT_SESSIONS.LIST);
}
