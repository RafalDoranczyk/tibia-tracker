"use server";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { insertSessionMonstersWithPrey } from "../db/insertMonsterRows";
import { insertSessionRows } from "../db/insertSessionRows";
import {
  CreateHuntSessionPayloadSchema,
  type HuntSessionDbFields,
  HuntSessionDbFieldsSchema,
} from "../schemas";

export async function createHuntSession(payload: unknown): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(CreateHuntSessionPayloadSchema, payload);

  const { supabase } = await getUserScopedQuery();

  const { killed_monsters, supplies, looted_items, damage_elements, damage_sources, ...dbPayload } =
    parsed;

  const { data, error } = await supabase.from("hunt_sessions").insert(dbPayload).select().single();

  if (error || !data) {
    throw new Error("Failed to create hunt session");
  }

  await insertSessionMonstersWithPrey(data.id, killed_monsters);

  if (looted_items && looted_items.length > 0) {
    await insertSessionRows("hunt_session_looted_items", data.id, looted_items);
  }

  if (supplies && supplies.length > 0) {
    await insertSessionRows("hunt_session_supplies", data.id, supplies);
  }

  if (damage_elements && damage_elements?.length > 0) {
    await insertSessionRows("hunt_session_damage_elements", data.id, damage_elements);
  }

  if (damage_sources && damage_sources?.length > 0) {
    await insertSessionRows("hunt_session_damage_sources", data.id, damage_sources);
  }

  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
