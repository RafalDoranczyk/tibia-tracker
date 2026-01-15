"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { DeleteHuntSessionPayloadSchema } from "../schemas";

export async function deleteHuntSession(payload: { id: number; characterId: string }) {
  const data = assertZodParse(DeleteHuntSessionPayloadSchema, { id: payload.id });

  const { supabase, user } = await getUserScopedQuery();

  const { error: sessionError } = await supabase
    .from("hunt_sessions")
    .delete()
    .eq("id", data.id)
    .eq("user_id", user.id)
    .select("*")
    .single();

  if (sessionError) throw new Error(sessionError.message);

  revalidatePath(PATHS.CHARACTER(payload.characterId).HUNT_SESSIONS.LIST);
}
