"use server";

import { dbSetupNewCharacterRPC } from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse, NonEmptyString } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { executeHistorySync } from "@/modules/character/actions";
import { CharactersCache } from "../cache";
import { mapTibiaDataCharacterToDb } from "../mappers/mapTibiaDataCharacterToDb";
import { getCharacterByName } from "../server";

export async function setupNewCharacter(payload: unknown) {
  const parsedName = assertZodParse(NonEmptyString, payload);
  const { supabase, user } = await requireAuthenticatedSupabase();

  const tibiaData = await getCharacterByName(parsedName);

  if (!tibiaData?.character) {
    throwAndLogError(
      new Error("Character not found"),
      AppErrorCode.SERVER_ERROR,
      `Character ${parsedName} not found on Tibia.com`
    );
  }

  const { name, world, vocation } = mapTibiaDataCharacterToDb(tibiaData.character);

  const { error: rpcError, data } = await dbSetupNewCharacterRPC({
    supabase,
    payload: { name, world, vocation, userId: user.id },
  });

  if (rpcError) {
    if (rpcError.message.includes("limit reached")) {
      throw new Error(
        "You have reached the maximum number of characters allowed. Please delete an existing character before adding a new one."
      );
    }
    throw rpcError;
  }

  executeHistorySync({
    supabase,
    character: {
      globalCharacterId: data[0].global_char_id,
      name,
      world,
      vocation,
    },
  });

  updateTag(CharactersCache.characterList(user.id));

  return name;
}
