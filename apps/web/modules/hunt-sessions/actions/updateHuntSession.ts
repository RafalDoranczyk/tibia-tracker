"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import {
  deleteSessionDamageElements,
  insertSessionDamageElements,
} from "../db/huntSessionDamageElements";
import {
  deleteSessionDamageSources,
  insertSessionDamageSources,
} from "../db/huntSessionDamageSources";
import { deleteSessionMonsters, insertSessionMonsters } from "../db/huntSessionMonsters";
import { deleteSessionSupplies, insertSessionSupplies } from "../db/huntSessionSupplies";
import { HuntSessionDbFieldsSchema, UpdateHuntSessionPayloadSchema } from "../schemas";
import type { HuntSessionDbFields, UpdateHuntSessionPayload } from "../types";

export async function updateHuntSession(
  payload: UpdateHuntSessionPayload
): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(UpdateHuntSessionPayloadSchema, payload);

  const { supabase } = await getUserScopedQuery();

  const { id, monsters, supplies, damage_elements, damage_sources, ...dbPayload } = parsed;

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

  // replace monsters (DELETE + INSERT)
  await deleteSessionMonsters(id);
  await insertSessionMonsters(id, monsters);

  // replace supplies (DELETE + INSERT)
  await deleteSessionSupplies(id);
  if (supplies && supplies.length > 0) {
    await insertSessionSupplies(id, supplies);
  }

  // replace damage elements (DELETE + INSERT)
  await deleteSessionDamageElements(id);
  if (damage_elements && damage_elements.length > 0) {
    await insertSessionDamageElements(id, damage_elements);
  }

  // replace damage sources (DELETE + INSERT)
  await deleteSessionDamageSources(id);
  if (damage_sources && damage_sources.length > 0) {
    await insertSessionDamageSources(id, damage_sources);
  }

  // return updated db row
  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
