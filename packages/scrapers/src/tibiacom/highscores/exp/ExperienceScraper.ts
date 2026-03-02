import type { ExperienceLogEntry } from "../../types";
import type { HighscoreScraper, ScrapeTarget } from "../HighscoreManager";
import { scrapeExpPage } from "./scrapeExpPage";

export class ExperienceScraper implements HighscoreScraper<ExperienceLogEntry> {
  type = "experience";

  async scrapePage(target: ScrapeTarget) {
    return await scrapeExpPage(target);
  }
}
