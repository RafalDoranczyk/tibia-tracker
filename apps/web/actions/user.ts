import { AppError, AppErrorCodes, createSupabase, mapSupabaseErrorToAppError } from "@/core";

export async function getUser() {
  try {
    const supabase = await createSupabase();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw mapSupabaseErrorToAppError(error);
    }

    if (!user) {
      throw new AppError(AppErrorCodes.UNAUTHORIZED, "User not authenticated");
    }

    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(AppErrorCodes.SERVER_ERROR, "Failed to get user");
  }
}

export async function ensureUserSettings(userId: string): Promise<void> {
  try {
    const supabase = await createSupabase();

    // Check user settings exist
    const { data: existingSettings } = await supabase
      .from("user_settings")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (!existingSettings) {
      await supabase.from("user_settings").insert({
        user_id: userId,
        theme: "light",
        notifications: true,
        language: "pl",
      });
    }
  } catch (error) {
    console.error("Failed to ensure user settings:", error);
  }
}
