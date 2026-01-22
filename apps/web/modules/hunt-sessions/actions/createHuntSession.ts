"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { insertSessionDamageElements } from "../db/huntSessionDamageElements";
import { insertSessionDamageSources } from "../db/huntSessionDamageSources";
import { insertSessionMonsters } from "../db/huntSessionMonsters";
import { insertSessionSupplies } from "../db/huntSessionSupplies";
import { CreateHuntSessionPayloadSchema, HuntSessionDbFieldsSchema } from "../schemas";
import type { CreateHuntSessionPayload, HuntSessionDbFields } from "../types";

export async function createHuntSession(
  payload: CreateHuntSessionPayload
): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(CreateHuntSessionPayloadSchema, payload);

  const { supabase } = await getUserScopedQuery();

  const { monsters, supplies, damage_elements, damage_sources, ...dbPayload } = parsed;

  const { data, error } = await supabase.from("hunt_sessions").insert(dbPayload).select().single();

  if (error || !data) {
    console.log(error);
    throw new Error("Failed to create hunt session");
  }

  await insertSessionMonsters(data.id, monsters);
  await insertSessionSupplies(data.id, supplies);
  await insertSessionDamageElements(data.id, damage_elements);
  await insertSessionDamageSources(data.id, damage_sources);

  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
