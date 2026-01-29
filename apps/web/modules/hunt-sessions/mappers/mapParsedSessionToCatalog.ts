import type { HuntSessionUnknownEntity } from "../types";

export function mapParsedEntitiesToCatalog<
  TParsed extends HuntSessionUnknownEntity,
  TCatalog extends { id: number; name: string; image_path?: string | null },
>(parsed: TParsed[], catalog: TCatalog[]) {
  const catalogMap = new Map(catalog.map((e) => [e.name.toLowerCase(), e]));

  const mapped: (TCatalog & { count: number })[] = [];
  const unknown: HuntSessionUnknownEntity[] = [];

  for (const p of parsed) {
    const key = p.name.toLowerCase();
    const found = catalogMap.get(key);

    if (!found) {
      unknown.push(p);
      continue;
    }

    mapped.push({
      ...found,
      count: p.count,
    });
  }

  mapped.sort((a, b) => b.count - a.count);

  return { mapped, unknown };
}
