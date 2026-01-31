"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { deleteSessionRows } from "../db/deleteSessionRows";
import { insertSessionRows } from "../db/insertSessionRows";
import { replaceSessionMonstersWithPrey } from "../db/replaceSessionMonstersWithPrey";
import { HuntSessionDbFieldsSchema, UpdateHuntSessionPayloadSchema } from "../schemas";
import type { HuntSessionDbFields, UpdateHuntSessionPayload } from "../types";

export async function updateHuntSession(
  payload: UpdateHuntSessionPayload
): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(UpdateHuntSessionPayloadSchema, payload);

  const { supabase } = await getUserScopedQuery();

  const {
    id,
    killed_monsters,
    supplies,
    damage_elements,
    damage_sources,
    looted_items,
    ...dbPayload
  } = parsed;

  const { data, error } = await supabase
    .from("hunt_sessions")
    .update(dbPayload)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    console.log(error);
    throw new Error("Failed to update hunt session");
  }

  // replace monsters + prey
  await replaceSessionMonstersWithPrey(id, killed_monsters);

  // replace looted items (DELETE + INSERT)
  await deleteSessionRows("hunt_session_looted_items", id);
  if (looted_items && looted_items.length > 0) {
    await insertSessionRows("hunt_session_looted_items", id, looted_items);
  }

  // replace supplies (DELETE + INSERT)
  await deleteSessionRows("hunt_session_supplies", id);
  if (supplies && supplies.length > 0) {
    await insertSessionRows("hunt_session_supplies", id, supplies);
  }

  // replace damage elements (DELETE + INSERT)
  await deleteSessionRows("hunt_session_damage_elements", id);
  if (damage_elements && damage_elements.length > 0) {
    await insertSessionRows("hunt_session_damage_elements", id, damage_elements);
  }

  // replace damage sources (DELETE + INSERT)
  await deleteSessionRows("hunt_session_damage_sources", id);
  if (damage_sources && damage_sources.length > 0) {
    await insertSessionRows("hunt_session_damage_sources", id, damage_sources);
  }

  // return updated db row
  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
