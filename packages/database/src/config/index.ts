export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
} as const;

export function validateConfig() {
  if (!SUPABASE_CONFIG.url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!SUPABASE_CONFIG.anonKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
}
