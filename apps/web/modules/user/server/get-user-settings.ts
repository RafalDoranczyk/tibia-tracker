import { createAdminSupabaseClient } from "@repo/database/client";
import { UserRepo, type UserSetting, UserSettingSchema } from "@repo/database/user";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { UserCache } from "../cache";

async function getCachedUserSettings(userId: string) {
  "use cache";
  cacheLife("days");
  cacheTag(UserCache.settings(userId));

  const supabase = createAdminSupabaseClient();

  const { data, error } = await UserRepo.getSettings(supabase, userId);

  if (error) throw error;

  return data;
}

export async function getUserSettings(): Promise<UserSetting | null> {
  const { user } = await requireAuthenticatedSupabase();

  try {
    const data = await getCachedUserSettings(user.id);
    if (!data) {
      return null;
    }

    return assertZodParse(UserSettingSchema, data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch user settings");
  }
}
