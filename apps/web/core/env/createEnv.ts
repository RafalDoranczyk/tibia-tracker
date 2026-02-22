import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-only environment variables
   */
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1),
  },

  /**
   * Client-safe environment variables
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_AUTH_CALLBACK_URL: z.url(),
    NEXT_PUBLIC_SUPABASE_URL: z.url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_ASSET_BASE_URL: z.url(),
    NEXT_PUBLIC_TIBIA_DATA_API_URL: z.url(),
  },

  /**
   * Shared / runtime variables (available on both sides)
   */
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * Runtime source (the ONLY place touching process.env)
   */
  runtimeEnv: {
    // server
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,

    // client
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_AUTH_CALLBACK_URL: process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_ASSET_BASE_URL: process.env.NEXT_PUBLIC_ASSET_BASE_URL,
    NEXT_PUBLIC_TIBIA_DATA_API_URL: process.env.NEXT_PUBLIC_TIBIA_DATA_API_URL,

    // shared
    NODE_ENV: process.env.NODE_ENV,
  },
});
