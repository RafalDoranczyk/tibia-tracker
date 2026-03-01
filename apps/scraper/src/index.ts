import "dotenv/config";
import { WORLDS } from "./constants";
import { scrapeWorldHighscores } from "./scrapers/highscore";

async function runScrapersForAllWorlds() {
  for (const world of WORLDS) {
    await scrapeWorldHighscores(world);
  }
}

runScrapersForAllWorlds()
  .then(() => {
    console.log("All worlds processed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Fatal error during scraping:", err);
    process.exit(1);
  });
