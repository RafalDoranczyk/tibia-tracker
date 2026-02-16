import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";
import { UserCache } from "../../cache/user-cache";
import { type UserSetting, UserSettingSchema } from "../../schemas";
import { dbGetUserSettings } from "../queries/user-settings";

async function getCachedUserSettings(userId: string) {
  "use cache";
  cacheLife("days");
  cacheTag(UserCache.settings(userId));

  const supabase = createAdminClient();

  const { data, error } = await dbGetUserSettings(supabase, userId);

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
