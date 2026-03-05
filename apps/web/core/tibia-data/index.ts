import { createTibiaDataClient } from "@repo/tibia-data";

/**
 * Global instance of the TibiaData client for the web app.
 * Configured with Next.js specific caching.
 */
export const tibiaData = createTibiaDataClient({
  revalidate: 60 * 5, // Cache for 5 minutes
  tags: ["tibia-api"],
});
