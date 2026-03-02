import * as cheerio from "cheerio";
import { ScraperClient } from "../../../client";
import { HIGHSCORE_URL, type VocationId, type WorldName } from "../../constants";
import type { ExperienceLogEntry } from "../../types";

const client = new ScraperClient(HIGHSCORE_URL);

type Props = {
  world: WorldName;
  vocationId: VocationId;
  page: number;
};

export async function scrapeExpPage({
  world,
  vocationId,
  page,
}: Props): Promise<ExperienceLogEntry[]> {
  const url = `${HIGHSCORE_URL}&world=${world}&category=6&profession=${vocationId}&currentpage=${page}`;

  const html = await client.fetchHtml(url);
  if (!html) return [];

  const $ = cheerio.load(html);
  const results: ExperienceLogEntry[] = [];
  const timestamp = new Date().toISOString();

  $(".TableContent tr:not(:first-child)").each((_, el) => {
    const cols = $(el).find("td");
    if (cols.length >= 6) {
      const txt = (i: number) => $(cols[i]).text().trim();

      results.push({
        world,
        character_name: txt(1),
        vocation: txt(2),
        level: parseInt(txt(4), 10),
        experience: parseInt(txt(5).replace(/,/g, ""), 10),
        rank: parseInt(txt(0), 10),
        recorded_at: timestamp,
        source: "official",
      });
    }
  });

  return results;
}
