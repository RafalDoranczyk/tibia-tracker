import { env } from "@/env";

export const SUPABASE_CONFIG = {
  url: env.NEXT_PUBLIC_SUPABASE_URL,
  key: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};
