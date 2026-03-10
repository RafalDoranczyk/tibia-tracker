import * as cheerio from "cheerio";
import { ScraperClient } from "../../client";
import { GUILDSTATS_URL } from "../constants";

const client = new ScraperClient(GUILDSTATS_URL);

type GuildStatsHistoryEntry = {
  date: string;
  level: number;
  rank: number;
  experience: number;
  daily_gain_exp: number;
};

type BestDayEntry = Omit<GuildStatsHistoryEntry, "daily_gain_exp"> | null;

export type GuildStatsResponse = {
  history: GuildStatsHistoryEntry[];
  bestDay: BestDayEntry;
};

export class ExpHistoryScraper {
  type = "guildstats-character-history";

  async scrapeFull(name: string): Promise<GuildStatsResponse> {
    const $ = await this.getPageHtml(name);
    if (!$) return { history: [], bestDay: null };

    return {
      history: this.findHistoryTable($),
      bestDay: this.findBestDay($),
    };
  }

  async scrapeHistory(name: string): Promise<GuildStatsHistoryEntry[]> {
    const $ = await this.getPageHtml(name);
    if (!$) return [];

    return this.findHistoryTable($);
  }

  private async getPageHtml(name: string): Promise<cheerio.CheerioAPI | null> {
    const url = `/character?nick=${encodeURIComponent(name)}&tab=9`;
    const html = await client.fetchHtml(url);
    if (!html) return null;

    return cheerio.load(html);
  }

  private findBestDay($: cheerio.CheerioAPI): BestDayEntry {
    const container = $("*:contains('Best recorded day')").closest("table");
    const dataRow = container.find("tr").has("td").first();
    const cols = dataRow.find("td");

    const cleanToNumber = (text: string) => Number(text.replace(/[^0-9]/g, ""));

    const rawDate = $(cols[0]).text().trim();
    const rawExp = $(cols[1]).text();
    const rawRank = $(cols[2]).text();
    const rawLevel = $(cols[3]).text();

    return {
      date: rawDate,
      experience: cleanToNumber(rawExp),
      rank: cleanToNumber(rawRank),
      level: cleanToNumber(rawLevel),
    };
  }

  private findHistoryTable($: cheerio.CheerioAPI): GuildStatsHistoryEntry[] {
    const history: GuildStatsHistoryEntry[] = [];

    const historyTable = $("table").filter((_, table) => {
      const text = $(table).find("th, td").text();
      return text.includes("Experience") && text.includes("Exp change");
    });

    if (historyTable.length === 0) return history;

    historyTable.find("tr").each((_, el) => {
      const cols = $(el).find("td");
      if (cols.length < 5) return;

      const [date, raw_gain_exp, rank, rawLvl, rawExp] = cols
        .map((_, c) => $(c).text().trim())
        .get();

      history.push({
        date,
        level: parseInt(rawLvl.split(" ")[0], 10),
        rank: parseInt(rank, 10),
        experience: parseInt(rawExp.replace(/,/g, ""), 10),
        daily_gain_exp: parseInt(raw_gain_exp.replace(/,/g, ""), 10),
      });
    });

    return history;
  }
}
