import { PAGES_PER_VOCATION, type VocationId, type WorldName } from "../../constants";
import { savePlayersToDatabase } from "../../db";
import { delay } from "../../utils/delay";
import { scrapeHighscorePage } from "./scrapeHighscorePage";

// Base delay in milliseconds between page requests to avoid rate limiting
const DELAY_MS = 800;

/**
 * Core logic: Scrapes all pages (1-20) for a specific vocation ID on a given world
 */
export async function processVocation(world: WorldName, vocationId: VocationId) {
  console.log(`\n--- Vocation ID: ${vocationId} ---`);

  for (let page = 1; page <= PAGES_PER_VOCATION; page++) {
    const timestamp = new Date().toLocaleTimeString();
    process.stdout.write(`[${timestamp}] 📄 Page ${page}/${PAGES_PER_VOCATION}... `);

    try {
      const pagePlayers = await scrapeHighscorePage({ world, vocationId, page });

      if (pagePlayers.length > 0) {
        const { error } = await savePlayersToDatabase(pagePlayers);

        if (error) {
          console.log(`❌ DB Error: ${error.message}`);
        } else {
          console.log(`✅ Saved ${pagePlayers.length} players`);
        }
      } else {
        console.log(`⚠️ No data found!`);
      }
    } catch {
      console.log(`❌ Critical error on page ${page}`);
    }

    // Rate limiting protection
    if (page < PAGES_PER_VOCATION) await delay(DELAY_MS);
  }
}
