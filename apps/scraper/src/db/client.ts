import type { Database } from "@repo/database";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!(supabaseUrl && supabaseKey)) {
  throw new Error(
    "Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
