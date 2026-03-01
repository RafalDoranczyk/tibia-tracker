import axios from "axios";

export async function fetchTibiaPage(world: string, vocation: string, page: number) {
  const apiKey = process.env.SCRAPER_API_KEY;
  const targetUrl = `https://www.tibia.com/community/?subtopic=highscores&world=${world}&category=6&profession=${vocation}&currentpage=${page}`;

  const proxyUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(targetUrl)}`;

  try {
    const response = await axios.get(proxyUrl);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Proxy Error on page ${page}:`, error.message);
    return null;
  }
}
