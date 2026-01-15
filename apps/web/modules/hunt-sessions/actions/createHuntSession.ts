"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { CreateHuntSessionFullPayloadSchema } from "../schemas";
import { insertSessionMonstersByName } from "./insertSessionMonsters";

export async function createHuntSession(payload: unknown) {
  const data = assertZodParse(CreateHuntSessionFullPayloadSchema, payload);
  const { supabase, user } = await getUserScopedQuery();

  const { data: session, error: sessionError } = await supabase
    .from("hunt_sessions")
    .insert({
      user_id: user.id,
      level: data.level,
      balance: data.balance,
      raw_xp_gain: data.raw_xp_gain,
      minutes: data.minutes,
      place_id: data.place_id,
      date: data.date,
    })
    .select()
    .single();

  if (sessionError) throw new Error(sessionError.message);

  // const sessionId = session.id;

  if (data.monsters?.length) {
    await insertSessionMonstersByName(session.id, data.monsters);
  }

  // if (data.supplies?.length) await insertSessionSupplies(sessionId, data.supplies);

  // if (data.damage_types?.length) await insertSessionDamageTypes(sessionId, data.damage_types);
  // if (data.damage_sources?.length) await insertSessionDamageSources(sessionId, data.damage_sources);

  return session;
  // return assertZodParse(HuntSessionSchema, session);
}
