"use server";

import { AppError } from "@/core/errors/AppError";
import { AppErrorCodes } from "@/core/errors/AppErrorCodes";
import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type UserSetting, UserSettingSchema } from "../schemas";

const SELECT = Object.keys(UserSettingSchema.shape).join(", ");

export async function fetchUserSettings(): Promise<UserSetting> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("user_settings").select(SELECT).single();

  if (error) {
    throw new AppError(AppErrorCodes.SERVER_ERROR, "Failed to fetch user settings");
  }

  return assertZodParse(UserSettingSchema, data);
}
