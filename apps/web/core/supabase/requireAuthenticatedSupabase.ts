import { AppError, AppErrorCode } from "../error";
import { createServerSupabase } from "./createServerSupabase";

export async function requireAuthenticatedSupabase() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, "User not authenticated");
  }

  return { supabase, userId: user.id };
}
