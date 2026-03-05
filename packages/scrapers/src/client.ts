import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export class ScraperClient {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
  }

  public async fetchHtml(url: string, config?: AxiosRequestConfig): Promise<string> {
    try {
      const { data } = await this.api.get<string>(url, config);
      return data;
    } catch (error) {
      this.handleError(error, url);
    }
  }

  private handleError(error: unknown, url: string): never {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.message;

      if (status === 403) {
        throw new Error(`[Scraper] Access Forbidden (403) at ${url}. Possible bot detection.`);
      }
      if (status === 404) {
        throw new Error(`[Scraper] Page not found (404) at ${url}.`);
      }

      throw new Error(`[Scraper] HTTP Error ${status}: ${message} at ${url}`);
    }

    throw new Error(`[Scraper] Unexpected error at ${url}: ${String(error)}`);
  }
}
