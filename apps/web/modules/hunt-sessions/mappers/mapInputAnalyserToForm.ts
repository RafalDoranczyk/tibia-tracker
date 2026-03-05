import type { DamageElement, MonsterPreview } from "@repo/database";

export function mapInputAnalyserToForm(
  damageElementList: DamageElement[],
  monsterList: MonsterPreview[],
  text: string
) {
  const damageElementsResult: { damageElementId: number; percent: number }[] = [];
  const monsterSourcesResult: { monsterId: number; percent: number }[] = [];

  const elementSection = text.match(/Damage Types([\s\S]*?)Damage Sources/);
  if (elementSection) {
    const elementLines = elementSection[1].split("\n");
    for (const line of elementLines) {
      const match = line.match(/^\s*([a-zA-Z\s]+?)\s+\d{1,3}(?:,\d{3})*\s+\((\d+(?:\.\d+)?)%\)/);
      if (match) {
        const name = match[1].trim();
        const percent = parseFloat(match[2]);
        const element = damageElementList.find((e) => e.name.toLowerCase() === name.toLowerCase());

        if (element) {
          damageElementsResult.push({
            damageElementId: element.id,
            percent,
          });
        }
      }
    }
  }

  const sourceSection = text.match(/Damage Sources([\s\S]*?)$/);
  if (sourceSection) {
    const sourceLines = sourceSection[1].split("\n");
    for (const line of sourceLines) {
      const match = line.match(/^\s*(.+?)\s+\d{1,3}(?:,\d{3})*\s+\((\d+(?:\.\d+)?)%\)/);

      if (match) {
        const name = match[1].trim();
        const percent = parseFloat(match[2]);

        if (name.toLowerCase() === "(other)") continue;

        const monster = monsterList.find((m) => m.name.toLowerCase() === name.toLowerCase());

        if (monster) {
          monsterSourcesResult.push({
            monsterId: monster.id,
            percent,
          });
        }
      }
    }
  }

  return {
    damageElements: damageElementsResult,
    monsterDamageSources: monsterSourcesResult,
  };
}
