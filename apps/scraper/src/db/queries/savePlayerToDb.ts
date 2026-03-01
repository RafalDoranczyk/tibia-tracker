import { supabase } from "../client";
import type { HighscoreEntry } from "../types";

export async function savePlayersToDatabase(players: HighscoreEntry[]) {
  if (players.length === 0) return { error: null };

  return await supabase.from("highscores").insert(players);
}
