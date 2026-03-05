import { delay } from "../../utils/delay";
import { PAGES_PER_VOCATION, VOCATION_IDS, type VocationId, type WorldName } from "../constants";

export interface ScrapeTarget {
  world: WorldName;
  vocationId: VocationId;
  page: number;
}

export interface HighscoreScraper<T> {
  type: string;
  scrapePage: (target: ScrapeTarget) => Promise<T[]>;
}

export type OnPageScraped<T> = (data: T[], target: ScrapeTarget) => Promise<void> | void;

export class HighscoreManager<T> {
  private readonly DELAY_MS = 1500;

  constructor(private scraper: HighscoreScraper<T>) {}

  async run(world: WorldName, onPageScraped: OnPageScraped<T>) {
    console.log(`🚀 Starting ${this.scraper.type} migration for ${world}...`);
    const startTime = Date.now();

    for (const vocationId of VOCATION_IDS) {
      await this.scrapeVocation(world, vocationId, onPageScraped);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n🏁 Finished ${world} in ${duration}s.`);
  }

  private async scrapeVocation(
    world: WorldName,
    vocationId: VocationId,
    onPageScraped: OnPageScraped<T>
  ) {
    console.log(`\n--- Vocation: ${vocationId} (${this.scraper.type}) ---`);

    for (let page = 1; page <= PAGES_PER_VOCATION; page++) {
      const timestamp = new Date().toLocaleTimeString();
      process.stdout.write(`[${timestamp}] 📄 Page ${page}/${PAGES_PER_VOCATION}... `);

      try {
        const players = await this.scraper.scrapePage({ world, vocationId, page });

        if (players.length > 0) {
          await onPageScraped(players, { world, vocationId, page });
          process.stdout.write(`✅ Found ${players.length} players.\n`);
        } else {
          process.stdout.write(`⚠️ Empty page.\n`);
        }
      } catch (error) {
        console.log(`\n❌ Error on page ${page}:`, error instanceof Error ? error.message : error);
      }

      if (page < PAGES_PER_VOCATION) {
        await delay(this.DELAY_MS);
      }
    }
  }
}
