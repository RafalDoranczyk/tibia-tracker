"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type UserSetting, UserSettingSchema } from "../schemas";
import { getUserSettings } from "../server";

export async function fetchUserSettings(): Promise<UserSetting | null> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getUserSettings(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch user settings");
  }

  if (!data) {
    return null;
  }

  return assertZodParse(UserSettingSchema, data);
}
