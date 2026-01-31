import type { HuntSessionRawParsed } from "../types";

export class HuntSessionParseError extends Error {
  constructor(public missingFields: string[]) {
    super("Invalid hunt session log");
  }
}

/* ================= Utils ================= */

function normalizeItemName(name: string) {
  return name
    .trim()
    .replace(/^(a|an|the)\s+/i, "")
    .replace(/^some\s+/i, "");
}

function parseDuration(text?: string): number {
  // Example: "01:00h"
  const match = text?.match(/(\d+):(\d+)/);
  if (!match) return 0;
  const [, h, m] = match;
  return Number(h) * 3600 + Number(m) * 60; // seconds
}

type ParsedItem = {
  name: string;
  count: number;
};

/* ================= Monsters ================= */

function parseMonsters(normalized: string): ParsedItem[] {
  const monsters: ParsedItem[] = [];

  const killedStart = normalized.indexOf("Killed Monsters:");
  const lootedStart = normalized.indexOf("Looted Items:");

  if (killedStart === -1) return monsters;

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

/* ================= Loot Items ================= */

function parseItems(normalized: string): ParsedItem[] {
  const items: ParsedItem[] = [];

  const lootedStart = normalized.indexOf("Looted Items:");
  if (lootedStart === -1) return items;

  const section = normalized.slice(lootedStart + "Looted Items:".length);

  const lines = section
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    const match = line.match(/^(\d+)x\s+(.+)$/i);
    if (!match) continue;

    const [, count, rawName] = match;

    items.push({
      name: normalizeItemName(rawName),
      count: Number(count),
    });
  }

  return items;
}

/* ================= Helpers ================= */

function assertDefined<T>(
  value: T,
  name: string,
  missing: string[]
): asserts value is NonNullable<T> {
  if (value == null) missing.push(name);
}

/* ================= Main Parser ================= */

// Parses a hunt session log in text format and returns structured data.
export function parseHuntSessionJSON(input: string): HuntSessionRawParsed {
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

  const getSessionTimes = () => {
    const match = normalized.match(
      /From\s*(\d{4}-\d{2}-\d{2}),\s*(\d{2}:\d{2}:\d{2})\s*to\s*(\d{4}-\d{2}-\d{2}),\s*(\d{2}:\d{2}:\d{2})/i
    );

    if (!match) {
      throw new HuntSessionParseError(["Session timestamps"]);
    }

    const [, d1, t1, d2, t2] = match;

    return {
      started_at: `${d1}T${t1}Z`,
      ended_at: `${d2}T${t2}Z`,
    };
  };

  /* ===== Core metrics ===== */

  const raw_xp_gain = getNumber(/^Raw XP Gain:\s*([\d.,]+)/im);
  const xp_gain = getNumber(/^XP Gain:\s*([\d.,]+)/im);
  const profit = getNumber(/Balance:\s*([-\d.,]+)/i);
  const loot_value = getNumber(/Loot:\s*([\d.,]+)/i);
  const supplies_cost = getNumber(/Supplies:\s*([\d.,]+)/i);
  const damage = getNumber(/Damage:\s*([\d.,]+)/i);
  const healing = getNumber(/Healing:\s*([\d.,]+)/i);

  const sessionDuration = getTime(/Session:\s*([\d:.h]+)/i);
  const date = getDate();
  const sessionTimes = getSessionTimes();

  /* ===== Validation ===== */

  const missing: string[] = [];
  assertDefined(raw_xp_gain, "Raw XP Gain", missing);
  assertDefined(xp_gain, "XP Gain", missing);
  assertDefined(profit, "Balance", missing);
  assertDefined(sessionDuration, "Session duration", missing);
  assertDefined(date, "Session date", missing);
  assertDefined(sessionTimes.started_at, "Session start time", missing);
  assertDefined(sessionTimes.ended_at, "Session end time", missing);

  if (missing.length > 0) {
    throw new HuntSessionParseError(missing);
  }

  return {
    raw_xp_gain,
    xp_gain,
    profit,
    loot_value: loot_value ?? 0,
    supplies_cost: supplies_cost ?? 0,
    damage: damage ?? 0,
    healing: healing ?? 0,
    date,
    duration_seconds: parseDuration(sessionDuration),
    ...sessionTimes,
    killed_monsters: parseMonsters(normalized),
    looted_items: parseItems(normalized),
  };
}
