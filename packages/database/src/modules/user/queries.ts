import type { TypedSupabaseClient } from "../../types";
import type { UserID } from "./schemas";

type DbGetUserRolePayload = {
  supabase: TypedSupabaseClient;
  userId: UserID;
};

export function dbGetUserRole({ supabase, userId }: DbGetUserRolePayload) {
  return supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle();
}
