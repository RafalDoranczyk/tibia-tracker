import { AppError, type AppErrorCodes } from "@/core";
import { env } from "@/env";
import {
  createSupabaseErrorMapper,
  createSupabaseServer,
  type SupabaseConfig,
} from "@/lib/supabase";

export const supabaseConfig: SupabaseConfig = {
  url: env.NEXT_PUBLIC_SUPABASE_URL,
  key: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

// --- Project-specific error mapper ---
export const mapSupabaseErrorToAppError = createSupabaseErrorMapper(
  (code: string, message: string, details?: string) =>
    new AppError(code as AppErrorCodes, message, details)
);

// --- Project-specific server client ---
export async function createSupabase() {
  return await createSupabaseServer(supabaseConfig.url, supabaseConfig.key);
}
