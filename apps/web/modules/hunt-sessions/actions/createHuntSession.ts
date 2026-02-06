"use server";

import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { insertSessionMonstersWithPreyAndCharm } from "../db/insertMonsterRows";
import { insertSessionRows } from "../db/insertSessionRows";
import {
  CreateHuntSessionPayloadSchema,
  type HuntSessionDbFields,
  HuntSessionDbFieldsSchema,
} from "../schemas";

export async function createHuntSession(payload: unknown): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(CreateHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { killed_monsters, supplies, looted_items, damage_elements, damage_sources, ...dbPayload } =
    parsed;

  const { data, error } = await supabase.from("hunt_sessions").insert(dbPayload).select().single();

  if (error || !data) {
    throw new Error("Failed to create hunt session");
  }

  const { id: sessionId } = data;

  await insertSessionMonstersWithPreyAndCharm(sessionId, killed_monsters);

  if (damage_sources && damage_sources?.length > 0) {
    await insertSessionRows("hunt_session_damage_sources", sessionId, damage_sources);
  }

  if (looted_items && looted_items.length > 0) {
    await insertSessionRows("hunt_session_looted_items", sessionId, looted_items);
  }

  if (supplies && supplies.length > 0) {
    await insertSessionRows("hunt_session_supplies", sessionId, supplies);
  }

  if (damage_elements && damage_elements?.length > 0) {
    await insertSessionRows("hunt_session_damage_elements", sessionId, damage_elements);
  }

  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
