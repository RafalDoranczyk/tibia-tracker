import type { Tables } from "@repo/database";

export type ExperienceLogEntry = Omit<Tables<"experience_log">, "id">;
