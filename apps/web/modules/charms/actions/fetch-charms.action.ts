"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type Charm, CharmSchema } from "../schemas";
import { getCharms } from "../server";

// Fetches all charms available in the system, regardless of character progress.
export async function fetchCharms(): Promise<Charm[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getCharms(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch charms");
  }
  return assertZodParse(CharmSchema.array(), data);
}
