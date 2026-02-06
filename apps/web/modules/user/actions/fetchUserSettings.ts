"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type UserSetting, UserSettingSchema } from "../schemas/user.schema";

const SELECT = Object.keys(UserSettingSchema.shape).join(", ");

export async function fetchUserSettings(): Promise<UserSetting> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase.from("user_settings").select(SELECT).maybeSingle();

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch user settings");
  }

  if (!data) {
    throw wrapAndLogError(null, AppErrorCode.NOT_FOUND, "User settings not found");
  }

  return assertZodParse(UserSettingSchema, data);
}
