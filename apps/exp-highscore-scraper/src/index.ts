import "dotenv/config";
import { runHighscoresScraperForAllWorlds } from "./runHighscoresScraperForAllWorlds";

runHighscoresScraperForAllWorlds()
  .then(() => {
    console.log("All worlds processed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Fatal error during scraping:", err);
    process.exit(1);
  });
