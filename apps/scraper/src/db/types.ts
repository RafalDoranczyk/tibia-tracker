import type { Tables } from "@repo/database";

export type HighscoreEntry = Omit<Tables<"highscores">, "id">;
