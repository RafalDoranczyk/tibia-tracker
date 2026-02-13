import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type HuntPlace, HuntPlaceSchema } from "../../schemas/hunt-place.schema";
import { getHuntPlaces } from "../queries/get-hunt-places.query";

/**
 * Fetches available hunt places for the current user.
 * Includes both user-specific and global entries.
 */
export async function fetchHuntPlaces(): Promise<HuntPlace[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getHuntPlaces(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt places");
  }

  return assertZodParse(HuntPlaceSchema.array(), data);
}
