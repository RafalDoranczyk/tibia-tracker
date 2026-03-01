import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/db.types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!(supabaseUrl && supabaseKey)) {
  throw new Error(
    "Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
