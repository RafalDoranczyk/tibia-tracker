import { type GuildStatsHistoryEntry, scrapeExpHistory } from "./scrapeExpHistory";

export class ExpHistoryScraper {
  type = "guildstats-character-history";

  async scrape(name: string): Promise<GuildStatsHistoryEntry[]> {
    return await scrapeExpHistory(name);
  }
}
