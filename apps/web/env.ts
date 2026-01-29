import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-only environment variables
   */
  server: {
    ANTHROPIC_API_KEY: z.string().min(1),
  },

  /**
   * Client-safe environment variables
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_AUTH_CALLBACK_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_ASSET_BASE_URL: z.string().url(),
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
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,

    // client
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_AUTH_CALLBACK_URL: process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_ASSET_BASE_URL: process.env.NEXT_PUBLIC_ASSET_BASE_URL,

    // shared
    NODE_ENV: process.env.NODE_ENV,
  },
});
