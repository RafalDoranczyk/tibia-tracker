import * as cheerio from "cheerio";
import { ScraperClient } from "../../../client";
import { GUILDSTATS_URL } from "../../constants";

const client = new ScraperClient(GUILDSTATS_URL);

export type GuildStatsHistoryEntry = {
  date: string;
  level: number;
  rank: number;
  experience: number;
};

export async function scrapeExpHistory(name: string): Promise<GuildStatsHistoryEntry[]> {
  const url = `/character?nick=${encodeURIComponent(name)}&tab=9`;
  const html = await client.fetchHtml(url);

  if (!html) return [];

  const $ = cheerio.load(html);
  const results: GuildStatsHistoryEntry[] = [];

  const historyTable = $("table").filter((_, table) => {
    const text = $(table).find("th, td").text();
    return text.includes("Experience") && text.includes("Exp change");
  });

  historyTable.find("tr").each((_, el) => {
    const cols = $(el).find("td");
    if (cols.length < 5) return;

    const [date, , rank, rawLvl, rawExp] = cols.map((_, c) => $(c).text().trim()).get();

    results.push({
      date,
      level: parseInt(rawLvl.split(" ")[0], 10),
      rank: parseInt(rank, 10),
      experience: parseInt(rawExp.replace(/,/g, ""), 10),
    });
  });

  return results;
}
