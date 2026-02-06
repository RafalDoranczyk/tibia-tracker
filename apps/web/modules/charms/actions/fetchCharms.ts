"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type Charm, CharmSchema } from "../schemas";

const SELECT = CharmSchema.keyof().options.join(",");

// Fetches all charms available in the system, regardless of character progress.
export async function fetchCharms(): Promise<Charm[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase.from("charms").select(SELECT);

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch charms");
  }

  return assertZodParse(CharmSchema.array(), data);
}
