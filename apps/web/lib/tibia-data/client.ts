import type { TibiaDataCharacterResponse } from "./types";

const BASE_URL = "https://api.tibiadata.com/v4";

export const tibiaDataClient = {
  async getCharacter(name: string): Promise<TibiaDataCharacterResponse | null> {
    const encodedName = encodeURIComponent(name).replace(/%20/g, "+");

    try {
      const response = await fetch(`${BASE_URL}/character/${encodedName}`, {
        method: "GET",

        next: { revalidate: 60, tags: ["tibia-api"] },
      });

      if (!response.ok) {
        if (response.status === 404 || response.status === 502) {
          return null;
        }
        throw new Error(`TibiaData API status: ${response.status}`);
      }

      const data = await response.json();

      if (data.information.status.http_code !== 200) {
        return null;
      }

      return data;
    } catch (error) {
      console.error("TibiaData Fetch Error:", error);
      return null;
    }
  },
};
