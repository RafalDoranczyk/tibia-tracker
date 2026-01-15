function parseDuration(text: string): number {
  const match = text.match(/(\d+):(\d+)/);
  if (!match) return 0;
  const [, h, m] = match;
  return Number(h) * 60 + Number(m);
}

export type HuntSessionParseResult = {
  rawXpGain?: number;
  balance?: number;
  duration?: number;
  monsters?: { name: string; count: number }[];
  date?: string;
};

export function parseHuntSessionText(input: string): HuntSessionParseResult {
  const normalized = input.replace(/\r/g, "").trim();

  const getNumber = (pattern: RegExp) => {
    const match = normalized.match(pattern);
    if (!match) return 0;
    return Number(match[1].replace(/[.,]/g, ""));
  };

  const getTime = (pattern: RegExp) => {
    const match = normalized.match(pattern);
    return match ? match[1] : "";
  };

  const getDate = () => {
    const match = normalized.match(/Session data:\s*From\s*(\d{4}-\d{2}-\d{2}),/i);
    return match ? match[1] : "";
  };

  const sessionDuration = getTime(/Session:\s*([\d:.h]+)/i);
  const rawXpGain = getNumber(/Raw XP Gain:\s*([\d.,]+)/i);
  const balance = getNumber(/Balance:\s*([-\d.,]+)/i);
  const monsters: { name: string; count: number }[] = [];

  const killedStart = normalized.indexOf("Killed Monsters:");
  const lootedStart = normalized.indexOf("Looted Items:");

  if (killedStart !== -1) {
    const section =
      lootedStart !== -1
        ? normalized.slice(killedStart + "Killed Monsters:".length, lootedStart)
        : normalized.slice(killedStart + "Killed Monsters:".length);

    const lines = section
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    for (const line of lines) {
      const match = line.match(/^(\d+)x\s+(.+)$/i);
      if (match) {
        const [, count, name] = match;
        monsters.push({
          name: name.trim(),
          count: Number(count),
        });
      }
    }
  }

  return {
    rawXpGain,
    balance,
    duration: parseDuration(sessionDuration),
    monsters,
    date: getDate(),
  };
}
