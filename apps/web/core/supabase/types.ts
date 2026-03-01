import type { Database } from "@repo/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export type TypedSupabaseClient = SupabaseClient<Database>;
