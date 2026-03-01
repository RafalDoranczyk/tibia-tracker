import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";
import type { VocationId, WorldName } from "../../constants";
import type { HighscoreEntry } from "../../db";

export const HIGHSCORE_URL = "https://www.tibia.com/community/?subtopic=highscores";

// The number of columns in the highscores table
const PAGE_COLUMN_NUMBER = 6;

function getData(url: string) {
  return axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
      Referer: "https://www.tibia.com/community/?subtopic=highscores",
    },
    timeout: 10000,
  });
}

type Props = {
  world: WorldName;
  vocationId: VocationId;
  page: number;
};

export async function scrapeHighscorePage({ world, vocationId, page }: Props) {
  const url = `${HIGHSCORE_URL}&world=${world}&category=6&profession=${vocationId}&currentpage=${page}`;

  try {
    const { data } = await getData(url);

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
  } catch (error: unknown) {
    console.error(
      `[Scraper] Failed to fetch: ${url}`,
      error instanceof AxiosError ? error.message : String(error)
    );
    return [];
  }
}
