export function mapParsedEntitiesToCatalog<
  TParsed extends { name: string; count: number },
  TCatalog extends { id: number; name: string },
>(parsed: TParsed[], catalog: TCatalog[]) {
  const catalogMap = new Map(catalog.map((c) => [c.name.toLowerCase(), c]));

  const mapped = [];
  const unknown = [];

  for (const p of parsed) {
    const match = catalogMap.get(p.name.toLowerCase());

    if (!match) {
      unknown.push(p.name);
      continue;
    }

    mapped.push({
      id: match.id,
      count: p.count,
    });
  }

  return { mapped, unknown };
}
