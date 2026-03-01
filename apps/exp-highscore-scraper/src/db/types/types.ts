import type { SupabaseClient } from "@supabase/supabase-js/dist/index.cjs";
import type { Database, Tables } from "./db.types";

export type TypedSupabaseClient = SupabaseClient<Database>;
export type HighscoreEntry = Omit<Tables<"highscores">, "id">;
