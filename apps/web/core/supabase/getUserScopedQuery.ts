import { AppError, AppErrorCodes } from "../errors";
import { createSupabase } from "./config";

export async function getUserScopedQuery() {
  const supabase = await createSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new AppError(AppErrorCodes.UNAUTHORIZED, "User not authenticated");
  }

  return { supabase, userId: user.id };
}
