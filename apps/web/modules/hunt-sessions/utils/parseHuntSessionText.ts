import type { HuntSessionLogParseResult } from "../types";

export class HuntSessionParseError extends Error {
  constructor(public missingFields: string[]) {
    super("Invalid hunt session log");
  }
}

function parseDuration(text?: string): number {
  const match = text?.match(/(\d+):(\d+)/);
  if (!match) return 0;
  const [, h, m] = match;
  return Number(h) * 60 + Number(m);
}

type ParsedMonster = {
  name: string;
  count: number;
};

function parseMonsters(normalized: string): ParsedMonster[] {
  const monsters: ParsedMonster[] = [];

  const killedStart = normalized.indexOf("Killed Monsters:");
  const lootedStart = normalized.indexOf("Looted Items:");

  if (killedStart === -1) {
    return monsters;
  }

  const section =
    lootedStart !== -1
      ? normalized.slice(killedStart + "Killed Monsters:".length, lootedStart)
      : normalized.slice(killedStart + "Killed Monsters:".length);

  const lines = section
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    const match = line.match(/^(\d+)x\s+(.+)$/i);
    if (!match) continue;

    const [, count, name] = match;

    monsters.push({
      name: name.trim(),
      count: Number(count),
    });
  }

  return monsters;
}

export function parseHuntSessionText(input: string): HuntSessionLogParseResult {
  const normalized = input.replace(/\r/g, "").trim();

  const getNumber = (pattern: RegExp) => {
    const match = normalized.match(pattern);
    return match ? Number(match[1].replace(/[.,]/g, "")) : undefined;
  };

  const getTime = (pattern: RegExp) => {
    const match = normalized.match(pattern);
    return match ? match[1] : undefined;
  };

  const getDate = () => {
    const match = normalized.match(/Session data:\s*From\s*(\d{4}-\d{2}-\d{2}),/i);
    return match ? match[1] : undefined;
  };

  const raw_xp_gain = getNumber(/Raw XP Gain:\s*([\d.,]+)/i);
  const xp_gain = getNumber(/XP Gain:\s*([\d.,]+)/i);
  const balance = getNumber(/Balance:\s*([-\d.,]+)/i);
  const sessionDuration = getTime(/Session:\s*([\d:.h]+)/i);
  const date = getDate();

  const missing: string[] = [];

  if (raw_xp_gain == null) missing.push("Raw XP Gain");
  if (xp_gain == null) missing.push("XP Gain");
  if (balance == null) missing.push("Balance");
  if (!sessionDuration) missing.push("Session duration");
  if (!date) missing.push("Session date");

  if (missing.length > 0) {
    throw new HuntSessionParseError(missing);
  }

  return {
    raw_xp_gain,
    xp_gain,
    balance,
    minutes: parseDuration(sessionDuration),
    date,
    monsters: parseMonsters(normalized),
  };
}
