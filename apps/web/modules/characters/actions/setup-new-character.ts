"use server";

import { CharactersRepo } from "@repo/database/characters";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse, NonEmptyString } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { setupNewGlobalCharacter } from "@/modules/character/server";
import { CharactersCache } from "../cache";
import { mapTibiaDataCharacterToDb } from "../mappers/mapTibiaDataCharacterToDb";
import { getCharacterByName } from "../server";

export async function setupNewCharacter(payload: unknown) {
  const parsedName = assertZodParse(NonEmptyString, payload);
  const { supabase, user } = await requireAuthenticatedSupabase();

  // 1. Fetch character data from Tibia.com to validate existence
  const tibiaData = await getCharacterByName(parsedName);

  if (!tibiaData?.character) {
    throwAndLogError(
      new Error("Character not found"),
      AppErrorCode.SERVER_ERROR,
      `Character ${parsedName} not found on Tibia.com`
    );
  }

  // 2. Map Tibia.com data to our database format
  const { name, world, vocation } = mapTibiaDataCharacterToDb(tibiaData.character);

  // 3. Insert character into database via RPC
  const { error: rpcError, data } = await CharactersRepo.setupNew(supabase, {
    name,
    world,
    vocation,
    userId: user.id,
  });

  if (rpcError || !data?.[0]) {
    throwAndLogError(
      new Error("Failed to set up character"),
      AppErrorCode.SERVER_ERROR,
      `RPC error: ${rpcError?.message}`
    );
  }

  const { global_char_id, is_new } = data[0];

  // 4. Trigger sync ONLY if character is new to our global system
  if (is_new) {
    await setupNewGlobalCharacter({
      supabase,
      character: {
        globalCharacterId: global_char_id,
        name,
        world,
        vocation,
      },
    });
  }

  updateTag(CharactersCache.characterList(user.id));

  return name;
}
