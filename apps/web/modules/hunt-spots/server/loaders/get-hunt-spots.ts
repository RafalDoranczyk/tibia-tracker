import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { type HuntSpot, HuntSpotSchema } from "../../schemas";
import { dbGetHuntSpots } from "../queries/hunt-spots";

export async function getHuntSpots(characterId: string): Promise<HuntSpot[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetHuntSpots(supabase, characterId);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt spots");
  }

  return assertZodParse(HuntSpotSchema.array(), data);
}
