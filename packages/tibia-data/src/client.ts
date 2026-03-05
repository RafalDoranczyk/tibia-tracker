import type { TibiaDataCharacterResponse } from "./types";

export type FetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

const BASE_URL = "https://api.tibiadata.com/v4";

export const createTibiaDataClient = (options?: FetchOptions) => ({
  async getCharacter(name: string): Promise<TibiaDataCharacterResponse | null> {
    const encodedName = encodeURIComponent(name).replace(/%20/g, "+");

    const fetchConfig: RequestInit & { next?: object } = {
      method: "GET",
      next: options
        ? {
            revalidate: options.revalidate,
            tags: options.tags,
          }
        : undefined,
    };

    try {
      const response = await fetch(`${BASE_URL}/character/${encodedName}`, fetchConfig);

      if (!response.ok) {
        if (response.status === 404 || response.status === 502) {
          return null;
        }
        throw new Error(`TibiaData API error: ${response.status}`);
      }

      const data = await response.json();

      // TibiaData API may return 200 OK even if character is not found
      if (data.information?.status?.http_code !== 200) {
        return null;
      }

      return data as TibiaDataCharacterResponse;
    } catch (error) {
      console.error(`[TibiaDataClient] Failed to fetch character "${name}":`, error);
      return null;
    }
  },
});
