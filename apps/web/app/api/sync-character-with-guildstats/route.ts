import { createAdminClient, type TypedSupabaseClient } from "@repo/database";
import { env } from "@/core/env";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { executeHistorySync } from "@/modules/character/actions";

export async function POST(req: Request) {
  try {
    // 1. Extract the Authorization header to check for an internal secret key
    const authHeader = req.headers.get("authorization");
    const isSecretKeyValid = authHeader === `Bearer ${env.GUILDSTATS_SYNC_SECRET_KEY}`;

    let supabase: TypedSupabaseClient;

    if (isSecretKeyValid) {
      /** * SCENARIO A: Internal request (from Server Action or future Scraper).
       * We use the Admin Client (service_role) to bypass Row Level Security (RLS)
       * as these processes might not have a traditional user session.
       */
      supabase = createAdminClient();
    } else {
      /** * SCENARIO B: Direct request or fallback.
       * We enforce the standard Auth Guard to ensure the user is logged in.
       * This client is bound by RLS policies based on the user's session.
       */
      const { supabase: authenticatedClient } = await requireAuthenticatedSupabase();
      supabase = authenticatedClient;
    }

    // 2. Parse the payload containing character details
    const { globalCharacterId, name, world, vocation } = await req.json();

    /** * 3. Execute the core synchronization logic.
     * This function fetches data from external APIs (e.g., GuildStats/TibiaData)
     * and updates the database using the provided Supabase client.
     */
    await executeHistorySync({
      supabase,
      character: { globalCharacterId, name, world, vocation },
    });

    return Response.json({ success: true });
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Sync Route Error:", error);

    // Determine the status code: 401 for Auth errors, 500 for internal failures
    const isAuthError = error instanceof Error && error.message.includes("authenticated");
    const status = isAuthError ? 401 : 500;

    return Response.json(
      { success: false, error: isAuthError ? "Unauthorized" : "Sync failed" },
      { status }
    );
  }
}
