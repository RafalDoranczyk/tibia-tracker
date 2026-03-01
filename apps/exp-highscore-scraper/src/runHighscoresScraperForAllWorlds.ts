import { VOCATION_IDS, VOCATION_MAP, type VocationName, WORLDS, type WorldName } from "./constants";
import { processVocation } from "./processVocation";

/**
 * Iterates through all defined vocations for a single world
 */
async function runHighscoresScraperForAllVocations(world: WorldName) {
  console.log(`🌍 Starting scraping highscores for ${world}...`);
  const startTime = Date.now();

  for (const vocationId of VOCATION_IDS) {
    await processVocation(world, vocationId);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n🏁 Finished ${world} in ${duration}s.`);
}

/**
 * MAIN ENTRY POINT: Processes all worlds defined in constants
 */
export async function runHighscoresScraperForAllWorlds() {
  for (const world of WORLDS) {
    await runHighscoresScraperForAllVocations(world);
  }
}

/**
 * TEST FUNCTION: Runs a single vocation scan to verify setup
 */

export async function runScraperForVocation(world: WorldName, vocationName: VocationName) {
  const vocationId = VOCATION_MAP[vocationName];
  console.log(`🚀 Starting scraper for ${vocationName} on ${world}...`);
  await processVocation(world, vocationId);
}

export async function testSingleVocation(
  world: WorldName = "Bona",
  vocName: VocationName = "Knight"
) {
  console.log(`🧪 Running test for ${world} - ${vocName}`);
  await runScraperForVocation(world, vocName);
}
