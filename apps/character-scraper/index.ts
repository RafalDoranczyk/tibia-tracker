import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import * as cheerio from "cheerio";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function scrapeHighscoresPage(world: string, profession: number, page: number) {
  const url = `https://www.tibia.com/community/?subtopic=highscores&world=${world}&category=6&profession=${profession}&currentpage=${page}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const players: any[] = [];

    // Na Twoim screenie widać, że właściwe dane są w tabeli .TableContent
    // Interesują nas wiersze, które mają parzyste/nieparzyste klasy lub po prostu td
    $(".TableContent tr").each((i, el) => {
      const cols = $(el).find("td");

      // Nagłówek ma zazwyczaj inna strukturę, dane gracza mają min. 5 kolumn (Rank, Name, Vocation, World, Level, Points)
      if (cols.length >= 5) {
        const name = $(cols[1]).text().trim();
        const level = $(cols[4]).text().trim(); // Level jest w 5. kolumnie (index 4)
        const points = $(cols[5]).text().replace(/,/g, "").trim(); // Points w 6. kolumnie (index 5)

        if (name && !isNaN(parseInt(level))) {
          players.push({
            name,
            level: parseInt(level),
            exp: points,
          });
        }
      }
    });
    return players;
  } catch (e) {
    console.error(`Błąd na stronie ${page}:`, e);
    return [];
  }
}

async function run() {
  const targetChar = "Luxiere Arakh";
  const world = "Bona";
  const prof = 3; // Paladins

  console.log(`🚀 Rozpoczynam poszukiwania ${targetChar}...`);

  // Przeszukujemy pierwsze 20 stron (Top 1000)
  for (let page = 1; page <= 20; page++) {
    process.stdout.write(`\r🔎 Sprawdzam stronę ${page}/20... `);
    const players = await scrapeHighscoresPage(world, prof, page);

    const found = players.find((p) => p.name.toLowerCase() === targetChar.toLowerCase());

    if (found) {
      console.log(`\n\n🎯 ZNALEZIONO!`);
      console.log(`Statystyki: Level ${found.level}, EXP: ${found.exp}`);

      // Zapis do Supabase
      const { error } = await supabase.from("character_logs").insert([
        {
          character_id: found.name,
          level: found.level,
          exp: found.exp,
        },
      ]);

      if (error) console.error("❌ Błąd zapisu:", error.message);
      else console.log("✅ Dane zapisane w Supabase.");

      process.exit(0);
    }

    // Mały delay, żeby nie spamować serwera
    await new Promise((r) => setTimeout(r, 600));
  }

  console.log("\n❌ Nie znaleziono postaci w Top 1000.");
  process.exit(0);
}

run();
