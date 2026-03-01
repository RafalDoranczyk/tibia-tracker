import axios from "axios";
import * as cheerio from "cheerio";
import { HIGHSCORE_URL, PAGE_COLUMN_NUMBER, type VocationId, type WorldName } from "./constants";
import type { HighscoreEntry } from "./db";

type Props = {
  world: WorldName;
  vocationId: VocationId;
  page: number;
};

export async function scrapeHighscorePage({ world, vocationId, page }: Props) {
  const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;

  const targetUrl = `${HIGHSCORE_URL}&world=${world}&category=6&profession=${vocationId}&currentpage=${page}`;

  const finalUrl = SCRAPER_API_KEY
    ? `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(targetUrl)}`
    : targetUrl;

  try {
    const { data } = await axios.get(finalUrl);

    const $ = cheerio.load(data);
    const players: HighscoreEntry[] = [];
    const timestamp = new Date().toISOString();

    $(".TableContent tr:not(:first-child)").each((_, el) => {
      const cols = $(el).find("td");

      if (cols.length >= PAGE_COLUMN_NUMBER) {
        const name = $(cols[1]).text().trim();
        const level = parseInt($(cols[4]).text().trim(), 10);
        const experience = parseInt($(cols[5]).text().replace(/,/g, "").trim(), 10);

        if (name && !Number.isNaN(level) && !Number.isNaN(experience)) {
          players.push({
            world,
            name,
            level,
            experience,
            rank: parseInt($(cols[0]).text().trim(), 10),
            vocation: $(cols[2]).text().trim(),
            vocation_id: vocationId,
            last_updated_at: timestamp,
          });
        }
      }
    });

    return players;
  } catch (error: any) {
    console.error(`[Scraper] Failed to fetch page ${page}: ${error.message}`);
    return [];
  }
}
